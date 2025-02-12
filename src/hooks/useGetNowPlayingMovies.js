import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { TMDB_BASE_URL } from "../utils/constants";

const useGetNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch(
          `${TMDB_BASE_URL}now_playing?&page=1`,
          API_OPTIONS
        );
        const json = await data.json();

        dispatch(addNowPlayingMovies(json.results));

      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useGetNowPlayingMovies;
