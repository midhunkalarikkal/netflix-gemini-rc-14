import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import useGetTopRatedMovies from "../hooks/useGetTopRatedMovies";
import useGetUpcomingMovies from "../hooks/useGetUpcomingMovies";
import useGetNowPlayingMovies from "../hooks/useGetNowPlayingMovies";
import Footer from "./Footer";

const Browse = () => {
  useGetNowPlayingMovies();
  useGetPopularMovies();
  useGetTopRatedMovies();
  useGetUpcomingMovies();

  return (
    <div>
      <Header /> 
      <MainContainer />
      <SecondaryContainer />
      <Footer />
    </div>
  );
};

export default Browse;
