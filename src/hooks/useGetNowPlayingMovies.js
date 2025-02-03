import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { fetchMovieTrailer } from "../utils/fetchMovieTrailers";
import { fetchMoviePosterAndLogo } from "../utils/fetchMoviePosterAndLogo";

const useGetNowPlayingMovies = () => {
  const dispatch = useDispatch();
  let list = "nowPlayingMovies";

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?&page=1",
          API_OPTIONS
        );
        const json = await data.json();

        dispatch(addNowPlayingMovies(json.results));

        json.results.forEach((movie) => {
          fetchMoviePosterAndLogo(movie.id, dispatch);
          fetchMovieTrailer(movie.id, list, dispatch);
        });
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useGetNowPlayingMovies;
