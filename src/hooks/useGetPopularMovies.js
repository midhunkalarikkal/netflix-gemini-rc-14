import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS, TMDB_BASE_URL } from "../utils/constants";

const useGetPopularMovies = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetch(
        `${TMDB_BASE_URL}popular?&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    };

    getPopularMovies();
  }, []);
};

export default useGetPopularMovies;
