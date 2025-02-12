import React from "react";
import useFetchTrailer from "../../hooks/useFetchTrailer";
import VideoBackgroundShimmer from "../Shimmer/VideoBackgroundShimmer";
import { IFRAME_URL_END, IFRAME_URL_START } from "../../utils/constants";

const VideoBackground = React.memo(({ id }) => {
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
            src={
              IFRAME_URL_START +
              `${trailer?.trailerKey}` +
              IFRAME_URL_END +
              `${trailer?.trailerKey}`
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      )}
    </>
  );
});

export default VideoBackground;
