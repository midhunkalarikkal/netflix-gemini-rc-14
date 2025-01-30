import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFullScreen } from "../../utils/loadingSlice";
import { addSelectedForLarge } from "../../utils/movieSlice";

const BigTrailer = () => {

  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies?.selectedForLarge);
  const handleBigTrailerClose = () => {
    dispatch(toggleFullScreen(false));
    dispatch(addSelectedForLarge(null));
  }

  return (
    <div className="w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10">
      <button className="absolute top-0 right-10 hover:bg-red-500 text-white px-3 py-1 rounded border-2 border-red-500" onClick={handleBigTrailerClose}>
        Close
      </button>
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailer || ""}?autoplay=1&controls=1&mute=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default BigTrailer;
