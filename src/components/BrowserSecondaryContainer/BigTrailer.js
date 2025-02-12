import React, { useMemo } from "react";
import { toCamelCase } from "../../utils/toCamelCase";
import { useDispatch, useSelector } from "react-redux";
import useFetchTrailer from "../../hooks/useFetchTrailer";
import { addSelectedMovie } from "../../utils/movieSlice";
import BigTrailerShimmer from "../Shimmer/BigTrailerShimmer";

const BigTrailer = React.memo(({ selectedMovie }) => {

  const { movieId, title, gemini } = selectedMovie;
  const dispatch = useDispatch();

  const geminiMovies = useSelector((store) => (gemini ? store.gemini.geminiMovieResults : null))
  const geminiMoviesArray = geminiMovies && Object.values(geminiMovies.flat());

  const listName = useMemo(() => (!gemini ? toCamelCase(title) : null), [gemini, title]);
  const movies = useSelector((store) => (!gemini ? store.movies?.[listName] : null));

  const movie = gemini ? geminiMoviesArray?.find((movie) => movie.id === movieId) : movies?.find((movie) => movie.id === movieId);

  const {
    adult,
    original_language,
    overview,
    popularity,
    release_date,
    title: movieTitle,
    vote_average,
    vote_count,
  } = movie;

  const trailer = useFetchTrailer(movieId ?? "");
  const trailerKey = trailer?.trailerKey || "";

  const handleBigTrailerClose = () => {
    dispatch(addSelectedMovie(null));
  };

  return (
    <div className="w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 z-50">
      <button
        className="absolute top-0 right-10 hover:bg-red-600 text-white px-1 md:px-3 py-0 md:py-1 rounded border-2 border-red-600 text-sm md:text-lg bg-opacity-60 bg-black"
        onClick={handleBigTrailerClose}
      >
        Close
      </button>
      {!trailerKey ? (
        <BigTrailerShimmer />
      ) : (
        <>
          <iframe
            className="w-full aspect-video bg-black"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&mute=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <div className="bg-black p-6 text-white space-y-4 shadow-lg">
            {movieTitle && (
              <h2 className="text-lg md:text-2xl font-bold text-white">{movieTitle}</h2>
            )}

            {overview && <p className="text-sm md:text-md text-gray-300"><span className="font-bold">Overview</span> : {overview}</p>}

            {release_date && (
              <p className="text-sm md:text-md text-gray-400">
                <span className="font-semibold text-white">Release Date:</span>{" "}
                {release_date}
              </p>
            )}

            {original_language && (
              <p className="text-sm md:text-md text-gray-400">
                <span className="font-semibold text-white">Language:</span>{" "}
                {original_language.toUpperCase()}
              </p>
            )}

            {popularity && (
              <p className="text-sm md:text-md text-gray-400">
                <span className="font-semibold text-white">Popularity:</span>{" "}
                {Math.round(popularity)}
              </p>
            )}

            {(vote_average || vote_count) && (
              <div className="flex items-center space-x-4 mt-2">
                {vote_average && (
                  <span className="px-3 py-1 rounded-lg text-sm md:text-md font-semibold">
                    ⭐ {vote_average.toFixed(1)}
                  </span>
                )}
                {vote_count && (
                  <span className="text-gray-400 text-sm md:text-md">
                    {vote_count} votes
                  </span>
                )}
              </div>
            )}

            {adult && (
              <span className="bg-red-700 px-3 py-1 rounded-md text-sm font-semibold">
                18+
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default BigTrailer;
