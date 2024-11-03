import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return;

  const random = Math.floor(Math.random() * movies?.length)

  const mainMovie = movies? movies[random] : "";
  const { original_title, overview, id } = mainMovie;
  
  return (
    <div className="relative">
      <VideoTitle original_title={original_title} overview={overview} id={id}/>
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
