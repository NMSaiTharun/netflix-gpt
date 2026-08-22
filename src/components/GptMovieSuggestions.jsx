import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovieResults } = gpt;
  if (!gptMovieResults?.length) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-80">
      <MovieList title="Suggestions" movies={gptMovieResults} />
    </div>
  );
};

export default GptMovieSuggestions;
