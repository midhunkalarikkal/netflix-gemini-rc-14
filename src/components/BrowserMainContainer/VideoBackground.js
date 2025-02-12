import React, { useCallback, useEffect, useMemo } from "react";
import { API_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../../utils/movieSlice";
import VideoBackgroundShimmer from "../Shimmer/VideoBackgroundShimmer";

const VideoBackground = React.memo(({ id }) => {
  console.log("videoBackground")

  const dispatch = useDispatch();
  const trailers = useSelector((store) => store.movies?.trailerVideos);
  const trailer = useMemo(() => trailers.find((trailer) => trailer.id === id), [trailers, id]);
  
  const fetchTrailer = useCallback(async (movieId) => {
    if (!movieId) return;
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
  
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
  
    dispatch(addTrailerVideo({
      trailerKey: trailer?.key,
      id: movieId,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (id && !trailer) {
      fetchTrailer(id);
    }
  }, [id, trailer]);

  return (
    <>
      {!trailer ? (
        <VideoBackgroundShimmer />
      ) : (
        <div className="w-full">
          <iframe
            key={trailer?.trailerKey}
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailer?.trailerKey}?autoplay=1&controls=0&mute=1&loop=1&playlist=${trailer?.trailerKey}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      )}
    </>
  );
});

export default VideoBackground;
