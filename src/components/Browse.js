import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import useGetTopRatedMovies from "../hooks/useGetTopRatedMovies";
import useGetUpcomingMovies from "../hooks/useGetUpcomingMovies";
import MainContainer from "./BrowserMainContainer/MainContainer";
import useGetNowPlayingMovies from "../hooks/useGetNowPlayingMovies";
import SecondaryContainer from "./BrowserSecondaryContainer/SecondaryContainer";

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
