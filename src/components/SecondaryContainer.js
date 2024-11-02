import CardExpand from "./CardExpand";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const trailerData = useSelector((store) => store.movies?.selectedMovie);
  const {movieId , trailer:{key} = {}, list} = trailerData ? trailerData : {};

  const renderMovieSection = (title, movieList) => (
    <>
      {movieList && <MovieList title={title} movies={movieList}/>}
      {trailerData?.title === title && <CardExpand movieId={movieId} trailer={key} list={list}/>}
    </>
  );

  return (
    <div className="-mt-6 md:-mt-16 lg:-mt-40 pl-1 md:pl-2 lg:pl-4 relative">
      {renderMovieSection("Now Playing", movies.nowPlayingMovies)}
      {renderMovieSection("Popular Movies", movies.popularMovies)}
      {renderMovieSection("Top Rated Movies", movies.topRatedMovies)}
      {renderMovieSection("Upcoming Movies", movies.upcomingMovies)}
    </div>
  );
};

export default SecondaryContainer;
