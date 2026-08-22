# Netflix GPT

A Netflix-style movie app with an AI search box. Sign in, browse movies and
trailers from TMDB, or just describe what you feel like watching and get five
suggestions back.

Live: https://ashy-cliff-0834e3f03.7.azurestaticapps.net

Built by Sai Tharun. The project is built based on learning from Akshay
Saini's Namaste React course.

## What it does

- Sign up and sign in with Firebase Auth
- Rows of now playing, popular, top rated and upcoming movies from TMDB
- Autoplaying trailer on the hero section
- AI search: ask for "latest movie releases in june 2026" and get five picks.
  It can search the web, so questions about recent releases get real answers
- UI in six languages

## How the AI search works

Calling OpenAI from the browser would put the API key in the JavaScript
bundle for anyone to take. So it runs in an Azure Function instead. The
browser sends the user's Firebase token, the function checks it with Google, then calls OpenAI. The key stays on the server.

## Running it

Node 20+, a Firebase project with email/password auth, and a TMDB read access
token.

```bash
npm install
cp .env.example .env    # fill in your values
npm run dev
```

AI search needs the function running too, which means the Azure Static Web
Apps CLI and an `api/local.settings.json` holding `OPENAI_API_KEY` and
`FIREBASE_API_KEY`.

## Deployment

Azure Static Web Apps, free tier, deployed by GitHub Actions on every push to
`main`. The `VITE_*` values are GitHub secrets used at build time. The OpenAI
key is an Azure environment variable read at run time, so it never reaches the
bundle.

## Not affiliated with Netflix

A personal learning project, not affiliated with or endorsed by Netflix. Movie
data and images from TMDB.
