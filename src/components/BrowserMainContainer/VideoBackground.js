import React from "react";
import VideoBackgroundShimmer from "../Shimmer/VideoBackgroundShimmer";
import useFetchTrailer from "../../hooks/useFetchTrailer";

const VideoBackground = React.memo(({ id }) => {
  console.log("videoBackground")
  const trailer = useFetchTrailer(id);

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
