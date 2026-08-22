const { app } = require("@azure/functions");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Per-user throttle. In-memory, so it resets whenever Azure recycles the
// instance -- enough to stop casual abuse, not a real quota system.
const hits = new Map();
const LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

const rateLimited = (uid) => {
  const now = Date.now();
  const rec = hits.get(uid);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(uid, { start: now, count: 1 });
    return false;
  }
  rec.count += 1;
  return rec.count > LIMIT;
};

// Validates a Firebase ID token without needing a service-account secret.
// The Web API key is public by design.
const verifyIdToken = async (idToken) => {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
      process.env.FIREBASE_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    // Surface Google's reason so a misconfigured key is distinguishable
    // from a genuinely bad token. Never includes the key itself.
    return { uid: null, reason: json?.error?.message || "HTTP " + res.status };
  }
  const uid = json?.users?.[0]?.localId ?? null;
  return { uid, reason: uid ? null : "NO_USER_IN_LOOKUP" };
};

app.http("suggest", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      if (!process.env.FIREBASE_API_KEY)
        return {
          status: 500,
          jsonBody: { error: "Server misconfigured: FIREBASE_API_KEY not set" },
        };

      // Azure SWA reserves the Authorization header for its own built-in
      // auth and overwrites it before the request reaches this function,
      // so the Firebase ID token travels in a custom header instead.
      const idToken = (request.headers.get("x-firebase-token") || "").trim();
      if (!idToken || idToken === "undefined")
        return { status: 401, jsonBody: { error: "Not signed in" } };

      const { uid, reason } = await verifyIdToken(idToken);
      if (!uid) {
        context.warn("token verification failed: " + reason);
        return { status: 401, jsonBody: { error: "Invalid session: " + reason } };
      }

      if (rateLimited(uid))
        return {
          status: 429,
          jsonBody: { error: "Too many searches, try again later" },
        };

      const { query } = await request.json();
      if (typeof query !== "string" || !query.trim())
        return { status: 400, jsonBody: { error: "Empty query" } };

      const response = await openai.responses.create({
        model: "gpt-5-mini",
        instructions: [
          "You are a movie recommendation engine.",
          "Return exactly 5 real, existing movie titles, comma separated.",
          "Output ONLY the titles: no numbering, no year, no commentary.",
          "Use each film's commonly known English title so it can be looked",
          "up in TMDB -- for non-English films use the title TMDB lists.",
          "Honour every constraint in the request: language or industry",
          "(Telugu, Korean, ...), genre, era, mood, and actor or director.",
          "If a requested year is in the future or you are unsure of it,",
          "fall back to the closest well-known titles that fit the other",
          "constraints rather than inventing titles.",
          "Today's date is " + new Date().toISOString().slice(0, 10) + ".",
        ].join(" "),
        input: query.trim().slice(0, 200),
      });

      const movies = (response.output_text || "")
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean)
        .slice(0, 5);

      if (!movies.length)
        return { status: 502, jsonBody: { error: "No suggestions returned" } };

      return { status: 200, jsonBody: { movies } };
    } catch (err) {
      context.error("suggest failed", err);
      return { status: 500, jsonBody: { error: "Suggestion service failed" } };
    }
  },
});
