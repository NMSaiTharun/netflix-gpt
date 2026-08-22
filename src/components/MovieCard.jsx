import { IMAGE_PATH } from "../utils/constants";

const MovieCard = ({ movie }) => {
  if (!movie.poster_path) return null;
  return (
    <div className="w-36 md:w-48  pr-4">
      <img src={IMAGE_PATH + movie.poster_path} alt={movie.original_title} />
    </div>
  );
};

export default MovieCard;
