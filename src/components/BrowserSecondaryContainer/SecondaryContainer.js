import MovieList from "./MovieList";
import CardExpand from "./CardExpand";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MovieListShimmer from "../Shimmer/MovieListShimmer";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const trailerData = useSelector((store) => store.movies?.selectedMovie);
  const [loadingStates, setLoadingStates] = useState({
    nowPlaying: true,
    popular: true,
    topRated: true,
    upcoming: true,
  });

  useEffect(() => {
    const newLoadingStates = { ...loadingStates };

    if (movies.nowPlayingMovies?.length > 0) {
      newLoadingStates.nowPlaying = false;
    }
    if (movies.popularMovies?.length > 0) {
      newLoadingStates.popular = false;
    }
    if (movies.topRatedMovies?.length > 0) {
      newLoadingStates.topRated = false;
    }
    if (movies.upcomingMovies?.length > 0) {
      newLoadingStates.upcoming = false;
    }
    setLoadingStates(newLoadingStates);
  }, [movies,loadingStates]);

  const { movieId, trailer: { key } = {}, list } = trailerData || {};

  const renderMovieSection = (title, movieList, loadingState) => (
    <div>
      {loadingState ? (
        <MovieListShimmer />
      ) : (
        <>
          <MovieList title={title} movies={movieList} />
          {trailerData?.title === title && (
            <CardExpand movieId={movieId} trailer={key} list={list} />
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="md:-mt-16 lg:-mt-40 pl-1 md:pl-2 lg:pl-4 relative">
      {renderMovieSection(
        "Now Playing",
        movies.nowPlayingMovies,
        loadingStates.nowPlaying
      )}
      {renderMovieSection(
        "Popular Movies",
        movies.popularMovies,
        loadingStates.popular
      )}
      {renderMovieSection(
        "Top Rated Movies",
        movies.topRatedMovies,
        loadingStates.topRated
      )}
      {renderMovieSection(
        "Upcoming Movies",
        movies.upcomingMovies,
        loadingStates.upcoming
      )}
    </div>
  );
};

export default SecondaryContainer;
