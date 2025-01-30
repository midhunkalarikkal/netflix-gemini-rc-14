import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import useGetTopRatedMovies from "../hooks/useGetTopRatedMovies";
import useGetUpcomingMovies from "../hooks/useGetUpcomingMovies";
import MainContainer from "./BrowserMainContainer/MainContainer";
import useGetNowPlayingMovies from "../hooks/useGetNowPlayingMovies";
import SecondaryContainer from "./BrowserSecondaryContainer/SecondaryContainer";
import BigTrailer from "./BrowserSecondaryContainer/BigTrailer";
import { useSelector } from "react-redux";

const Browse = () => {
  useGetNowPlayingMovies();
  useGetPopularMovies();
  useGetTopRatedMovies();
  useGetUpcomingMovies();

  const fullScreen = useSelector((store) => store.loading?.fullScreen);

  return (
    <div className="relative">
      <Header />
          <MainContainer />
          <SecondaryContainer />
       {fullScreen && 
        <BigTrailer />
       }
      
      <Footer />
    </div>
  );
};

export default Browse;
