import { useSelector } from "react-redux";
import { IMG_CDN } from "../utils/constants";

const VideoTitle = ({ original_title, overview, id }) => {
  
  const movieMetaData = useSelector((store) => store.movies?.metaData.find((meta) => meta.id === id));

  return (
    <div className="absolute bg-gradient-to-r from-black w-screen aspect-video">
      <div className="absolute bottom-36 left-8  p-4 text-white">
        {movieMetaData?.logo ? (
          <img className="w-72" src={IMG_CDN + movieMetaData?.logo} alt="movie_title"/>
        ) : (
          <h1 className="font-bold text-6xl">{original_title}</h1>
        )}
        <p className="text-md w-4/12 py-4">{overview}</p>
        <div className="my-3 py-4">
          <button className="bg-white text-black py-3 px-8 font-bold text-lg rounded-md hover:bg-opacity-50 hover:text-white">
            Play
          </button>
          <button className="bg-gray-400 text-white py-3 px-8 mx-4 font-bold text-lg rounded-md bg-opacity-50 hover:bg-opacity-75 hover:text-black">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
