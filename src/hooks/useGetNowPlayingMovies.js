import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { fetchMoviePosterAndLogo } from "../utils/fetchMoviePosterAndLogo";

const useGetNowPlayingMovies = async () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?&page=1",
        API_OPTIONS
      );
      const json = await data.json();

      dispatch(addNowPlayingMovies(json.results));

      json.results.forEach((movie) => {
        fetchMoviePosterAndLogo(movie.id, dispatch);
      });
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useGetNowPlayingMovies;
