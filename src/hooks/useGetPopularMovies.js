import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { fetchMoviePosterAndLogo } from "../utils/fetchMoviePosterAndLogo";

const useGetPopularMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?&page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addPopularMovies(json.results))
        json.results.forEach((movie) => {
            fetchMoviePosterAndLogo(movie.id, dispatch);
          });
    }

        getPopularMovies()
    },[dispatch])
}

export default useGetPopularMovies;