import { useEffect } from "react";
import { API_OPTIONS } from "../src/utils/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../src/utils/moviesSlice";
const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const movieSelector = useSelector((store) => store.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  };
  useEffect(() => {
    !movieSelector && getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;
