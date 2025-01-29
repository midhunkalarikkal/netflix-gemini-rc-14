import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoBackgroundShimmer from "../Shimmer/VideoBackgroundShimmer";
import { toggleMainContainerVideoBackgroundLoading } from "../../utils/loadingSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerData = useSelector((store) =>
    store.movies?.trailerVideo.find((trailer) => trailer.movieId === movieId)
  );
  const mainContainerVideoBackgroundLoading = useSelector(
    (store) => store.loading?.mainContainerVideoBackgroundLoading
  );

  useEffect(() => {
    if (trailerData?.trailer) {
      setTimeout(() => {
        dispatch(toggleMainContainerVideoBackgroundLoading(false));
      }, 2000);
    }
  }, [trailerData, dispatch]);

  return (
    <>
      {mainContainerVideoBackgroundLoading ? (
        <VideoBackgroundShimmer />
      ) : (
        <div className="w-full">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailerData?.trailer?.key}?autoplay=1&controls=0&mute=1&loop=1&playlist=${trailerData?.trailer?.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default VideoBackground;
