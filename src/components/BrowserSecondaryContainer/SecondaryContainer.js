import MovieList from "./MovieList";
import CardExpand from "./CardExpand";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="md:-mt-16 lg:-mt-40 pl-1 md:pl-2 lg:pl-4 relative">
      {(
        <>
        <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Popular Movies"} movies={movies.popularMovies}/>
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
        </>
      )}
    </div>
  );
};

export default SecondaryContainer;
