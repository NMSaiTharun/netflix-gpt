import { useEffect } from "react";
import { API_OPTIONS } from "../src/utils/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../src/utils/moviesSlice";
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const movieSelector = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS,
    );
    const json = await data.json();
    const filteredData = json.results.filter((a) => a.type == "Trailer");
    const trailer = filteredData.length ? filteredData[0] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !movieSelector && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
