import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openAI from "../utils/openai";
import { useRef } from "react";
import MovieList from "./MovieList";
import { API_OPTIONS } from "../utils/tmdb";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const langSelector = useSelector(
    (store) => store.languageConfig.currentLanguage,
  );
  const searchMovieInTMDB = async (movie) => {
    const movieData = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    const jsonMovieData = await movieData.json();
    return jsonMovieData.results;
  };
  const handleGPTSearchClick = async () => {
    const query =
      "Act as a Recommendation system and suggest some movies for the query: " +
      searchText.current.value.toUpperCase() +
      " , Please give me names of 5 movies.";
    const response = await openAI.responses.create({
      model: "gpt-5-nano",
      instructions: "Only give 5 movies as comma separated values as output",
      input: query,
    });
    const top5MovieResults = response.output_text.split(",");
    const tmdbResultsPromiseArray = top5MovieResults.map((movie) =>
      searchMovieInTMDB(movie),
    );
    const finalTMDBResults = await Promise.all(tmdbResultsPromiseArray);
    dispatch(
      addGptMovieResult({
        movieNames: top5MovieResults,
        tmdbResults: finalTMDBResults,
      }),
    );
  };

  return (
    <div className="pt-[20%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-amber-50 col-span-9"
          placeholder={lang[langSelector].gptSearchPlaceHolder}
        />
        <button
          onClick={handleGPTSearchClick}
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3 text-2xl cursor-pointer"
        >
          {lang[langSelector].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
