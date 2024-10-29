import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerData = useSelector((store) => store.movies?.trailerVideo.find((trailer) => trailer.movieId === movieId));

  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerData?.trailer?.key}?autoplay=1&controls=0&mute=1&loop=1&playlist=${trailerData?.trailer?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
