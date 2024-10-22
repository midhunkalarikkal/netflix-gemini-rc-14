import Header from "./Header";
import useGetNowPlayingMovies from "../hooks/useGetNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {

  useGetNowPlayingMovies()

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
        Main container
          - video background
          - video title
        Secondary container
          - movie lists * n
          - cards * n
      */}
    </div>
  );
};

export default Browse;
