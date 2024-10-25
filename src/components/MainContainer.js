import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];
  console.log(mainMovie);
  const { original_title, overview, id } = mainMovie;
  
  return (
    <div className="relative bg-slate-300">
      <VideoTitle original_title={original_title} overview={overview} id={id}/>
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
