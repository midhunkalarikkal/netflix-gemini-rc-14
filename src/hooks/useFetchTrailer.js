import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useMemo } from "react";
import { TMDB_BASE_URL, FETCH_MOVIE_TRAILER_END } from "../utils/constants";

const useFetchTrailer = (id) => {
  
  const dispatch = useDispatch();
  const trailers = useSelector((store) => store.movies?.trailerVideos);

  const trailer = useMemo(
    () => trailers?.find((trailer) => trailer.id === id),
    [trailers, id]
  );

  const fetchTrailer = useCallback(async () => {
    if (!id || trailer) return; 

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}${id}${FETCH_MOVIE_TRAILER_END}`,
        API_OPTIONS
      );
      const json = await response.json();

      const filterData = json.results.filter((video) => video.type === "Trailer");
      const selectedTrailer = filterData.length ? filterData[0] : json.results[0];

      dispatch(
        addTrailerVideo({
          trailerKey: selectedTrailer?.key,
          id,
        })
      );
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  }, [dispatch, id, trailer]);

  useEffect(() => {
    fetchTrailer();
  }, [fetchTrailer]);

  return trailer;
};

export default useFetchTrailer;
