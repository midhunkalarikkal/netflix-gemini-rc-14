import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // console.log("nowPlayingMovies : ",movies.nowPlayingMovies)
  // console.log("PopularMovies : ",movies.popularMovies)
  return (
    <div className="-mt-40 relative pl-4">
      {movies.nowPlayingMovies &&
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      }
      {movies.popularMovies &&
      <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
      }
    </div>
  );
};

export default SecondaryContainer;
