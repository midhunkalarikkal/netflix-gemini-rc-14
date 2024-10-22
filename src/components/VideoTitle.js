const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="absolute bottom-12 left-8 p-4">
      <h1 className="font-bold text-6xl">{original_title}</h1>
      <p className="text-md w-4/12">{overview}</p>
      <div className="my-3 p-4">
        <button className="bg-white text-black py-3 px-8 font-bold text-lg rounded-md">▶️Play</button>
        <button className="bg-gray-400 text-black py-3 px-8 mx-4 font-bold text-lg rounded-md">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
