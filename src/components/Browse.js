import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import GeminiSearch from "./Gemini/GeminiSearch";
import { useSelector } from "react-redux";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import BigTrailer from "./BrowserSecondaryContainer/BigTrailer";
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

  const showGeminiSearch = useSelector((store) => store.gemini?.showGeminiSearch);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);

  return (
    <div className="relative">
      <Header />
      {selectedMovie && 
        <BigTrailer selectedMovie={selectedMovie}/>
       }

      {showGeminiSearch ? (
        <GeminiSearch />
      ) : (
        <>
        <MainContainer />
        <SecondaryContainer />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Browse;
