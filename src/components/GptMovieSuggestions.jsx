import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { addGptMovieResult } from "../utils/gptSlice";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovieResults, gptMovieNames } = gpt;
  if (!gptMovieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-80">
      {gptMovieNames.map((movie, index) => (
        <MovieList key={movie} title={movie} movies={gptMovieResults[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
