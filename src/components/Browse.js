import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useGetNowPlayingMovies from "../hooks/useGetNowPlayingMovies";
import useGetPopularMovies from "../hooks/useGetPopularMovies";

const Browse = () => {
  useGetNowPlayingMovies();
  useGetPopularMovies()

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
