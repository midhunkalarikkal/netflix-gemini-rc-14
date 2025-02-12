import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

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
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
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
