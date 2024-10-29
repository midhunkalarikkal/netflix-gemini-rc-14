import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  
  return (
    <div className="relative">
      <VideoTitle original_title={original_title} overview={overview} id={id}/>
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
