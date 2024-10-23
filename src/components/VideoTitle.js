const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="absolute bg-gradient-to-r from-black w-screen aspect-video">
      <div className="absolute bottom-36 left-8  p-4 text-white">
        <h1 className="font-bold text-6xl">{original_title}</h1>
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
