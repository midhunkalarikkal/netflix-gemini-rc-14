import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IMG_CDN } from "../../utils/constants";
import VideoTitleShimmer from "../Shimmer/VideoTitleShimmer";

const VideoTitle = ({ original_title, overview, id }) => {
  const [titleLoading, setTitleLoading] = useState(true);

  const movieMetaData = useSelector((store) =>
    store.movies?.metaData.find((meta) => meta.id === id)
  );
  
  useEffect(() => {
    if(movieMetaData){
      setTitleLoading(false);
    }
  }, [movieMetaData]);

  return (
    <div className="absolute bg-gradient-to-r from-black w-screen aspect-video">
       {titleLoading ? (
        <VideoTitleShimmer /> 
      ) : (
      <div className="absolute bottom-1 md:bottom-16 lg:bottom-36 left-2 md:left-6 lg:left-8 p-1 md:p-4 text-white">
        {movieMetaData?.logo ? (
          <img
            className="w-24 md:w-48 lg:w-72"
            src={IMG_CDN + movieMetaData?.logo}
            alt="movie_title"
          />
        ) : (
          <h1 className="font-bold text-xl md:text-3xl lg:text-6xl">
            {original_title}
          </h1>
        )}
        <p className="md:text-sm lg:text-md md:w-6/12 lg:w-4/12 py-1 hidden md:block">
          {overview}
        </p>
        <p className="text-xs sm:text-sm w-7/12 py-1 md:hidden">
          {overview.slice(0, 60) + "..."}
        </p>
        <div className="md:my-1 lg:my-3 md:py-2 lg:py-4">
          <button className="bg-white text-black py-1 px-2 md:px-4 lg:py-3 lg:px-8 font-semibold md:font-bold text-xs md:text-sm lg:text-lg rounded-md hover:bg-opacity-50 hover:text-white">
            Play
          </button>
          <button className="bg-gray-400 text-white py-1 px-2 lg:py-3 lg:px-8 mx-1 md:mx-4 font-semibold md:font-bold text-xs md:text-sm lg:text-lg rounded-md bg-opacity-50 hover:bg-opacity-75 hover:text-black">
            More Info
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default VideoTitle;
