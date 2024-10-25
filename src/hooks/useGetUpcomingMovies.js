import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { fetchMoviePosterAndLogo } from "../utils/fetchMoviePosterAndLogo";

const useGetUpcomingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
    json.results.forEach((movie) => {
      fetchMoviePosterAndLogo(movie.id, dispatch);
    });
  };

    getUpcomingMovies();
  }, [dispatch]);
};

export default useGetUpcomingMovies;
