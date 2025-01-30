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
import GptSearch from "./Gpt/GptSearch";

const Browse = () => {
  useGetNowPlayingMovies();
  useGetPopularMovies();
  useGetTopRatedMovies();
  useGetUpcomingMovies();

  const fullScreen = useSelector((store) => store.loading?.fullScreen);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  return (
    <div className="relative">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
        <MainContainer />
        <SecondaryContainer />
        </>
      )}
       {fullScreen && 
        <BigTrailer />
       }
      
      <Footer />
    </div>
  );
};

export default Browse;
