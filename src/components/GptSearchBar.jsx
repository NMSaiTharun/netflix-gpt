import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import { API_OPTIONS } from "../utils/tmdb";
import { addGptMovieResult } from "../utils/gptSlice";
import { auth } from "../utils/firebase";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const langSelector = useSelector(
    (store) => store.languageConfig.currentLanguage,
  );

  // TMDB search is fuzzy -- "RRR" also returns Takarazuka revues and
  // "RRRrrrr!!!". Keep only the best match: an exact title hit if there is
  // one, otherwise the most popular result.
  const searchMovieInTMDB = async (movie) => {
    const movieData = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    if (!movieData.ok) return null;
    const jsonMovieData = await movieData.json();
    const results = (jsonMovieData.results ?? []).filter((m) => m.poster_path);
    if (!results.length) return null;

    const wanted = movie.trim().toLowerCase();
    const exact = results.find(
      (m) =>
        m.title?.toLowerCase() === wanted ||
        m.original_title?.toLowerCase() === wanted,
    );
    if (exact) return exact;

    return results.reduce((best, m) =>
      (m.popularity ?? 0) > (best.popularity ?? 0) ? m : best,
    );
  };

  const handleGPTSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      setError("Please type something to search");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-Token": idToken,
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");

      const matches = await Promise.all(data.movies.map(searchMovieInTMDB));
      const tmdbResults = matches.filter(Boolean);
      if (!tmdbResults.length)
        throw new Error("No matching movies found, try rephrasing");
      dispatch(addGptMovieResult({ movieNames: data.movies, tmdbResults }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-full bg-black grid grid-cols-12 md:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          disabled={isLoading}
          onKeyDown={(e) => e.key === "Enter" && handleGPTSearchClick()}
          className="p-4 m-4 bg-amber-50 col-span-9 disabled:opacity-70"
          placeholder={lang[langSelector].gptSearchPlaceHolder}
        />
        <button
          onClick={handleGPTSearchClick}
          disabled={isLoading}
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3 text-2xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && (
            <span
              className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
              aria-hidden="true"
            />
          )}
          {isLoading ? "Searching" : lang[langSelector].search}
        </button>
        {error && (
          <p role="alert" className="col-span-12 px-4 pb-4 text-red-500">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
