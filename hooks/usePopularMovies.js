import { useEffect } from "react";
import { API_OPTIONS } from "../src/utils/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../src/utils/moviesSlice";
const usePopularMovies = () => {
  const dispatch = useDispatch();
  const movieSelector = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    dispatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    !movieSelector && getPopularMovies();
  }, []);
};
export default usePopularMovies;
