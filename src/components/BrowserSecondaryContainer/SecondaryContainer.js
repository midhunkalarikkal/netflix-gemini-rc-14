import MovieList from "./MovieList";
import CardExpand from "./CardExpand";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MovieListShimmer from "../Shimmer/MovieListShimmer";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const trailerData = useSelector((store) => store.movies?.selectedMovie);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(interval);
  },[]);

  const {
    movieId,
    trailer: { key } = {},
    list,
  } = trailerData ? trailerData : {};

  const renderMovieSection = (title, movieList) => (
    <>
      {movieList && <MovieList title={title} movies={movieList} />}
      {trailerData?.title === title && (
        <CardExpand movieId={movieId} trailer={key} list={list} />
      )}
    </>
  );

  return (
    <>
      {loading ? (
        <div className="md:-mt-16 lg:-mt-40 pl-1 md:pl-2 lg:pl-4 relative">
          <MovieListShimmer />
          <MovieListShimmer />
          <MovieListShimmer />
          <MovieListShimmer />
        </div>
      ) : (
        <div className="-mt-6 md:-mt-16 lg:-mt-40 pl-1 md:pl-2 lg:pl-4 relative">
          {renderMovieSection("Now Playing", movies.nowPlayingMovies)}
          {renderMovieSection("Popular Movies", movies.popularMovies)}
          {renderMovieSection("Top Rated Movies", movies.topRatedMovies)}
          {renderMovieSection("Upcoming Movies", movies.upcomingMovies)}
        </div>
      )}
    </>
  );
};

export default SecondaryContainer;
