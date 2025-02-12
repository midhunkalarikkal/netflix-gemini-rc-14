import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitleShimmer from "../Shimmer/VideoTitleShimmer";
import VideoBackgroundShimmer from "../Shimmer/VideoBackgroundShimmer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const random = Math.floor(Math.random() * movies?.length);
  const mainMovie = movies ? movies[random] : "";
  const movieData = {
    original_title: mainMovie.original_title,
    overview: mainMovie.overview,
    id: mainMovie.id,
  };

  return (
    <div className="relative">
      {!movies || movies.length === 0 ? (
        <>
          <div className="absolute bg-gradient-to-r from-black w-screen aspect-video">
            <VideoTitleShimmer />
          </div>
          <VideoBackgroundShimmer />
        </>
      ) : (
        <>
          <VideoTitle movie={movieData} />
          <VideoBackground id={mainMovie.id} />
        </>
      )}
    </div>
  );
};

export default MainContainer;
