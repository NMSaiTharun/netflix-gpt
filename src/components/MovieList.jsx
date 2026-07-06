import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 pb-2">
      <h1 className="text-xl md:text-2xl py-4 text-white font-bold">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
