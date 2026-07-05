import { IMAGE_PATH } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-48  pr-4">
      <img src={IMAGE_PATH + movie.poster_path} alt={movie.original_title} />
    </div>
  );
};

export default MovieCard;
