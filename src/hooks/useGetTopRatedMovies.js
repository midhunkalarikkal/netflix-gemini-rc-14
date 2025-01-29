import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { fetchMovieTrailer } from "../utils/fetchMovieTrailers";
import { fetchMoviePosterAndLogo } from "../utils/fetchMoviePosterAndLogo";

const useGetTopRatedMovies = () => {
  const dispatch = useDispatch();
  let list = "topRatedMovies";

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
      json.results.forEach((movie) => {
        fetchMoviePosterAndLogo(movie.id, dispatch);
        fetchMovieTrailer(movie.id,list, dispatch);
      });
    };

    getTopRatedMovies();
  }, []);
};

export default useGetTopRatedMovies;
