import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="-mt-40 relative pl-4">
      <MovieList title={"Now Playing"} movies={movies} />
      <MovieList title={"Now Playing"} movies={movies} />
      <MovieList title={"Now Playing"} movies={movies} />
      <MovieList title={"Now Playing"} movies={movies} />
      <MovieList title={"Now Playing"} movies={movies} />
    </div>
  );
};

export default SecondaryContainer;
