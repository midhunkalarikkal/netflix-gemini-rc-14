import React from "react";
import MovieCard from "./MovieCard";
import MovieCardShimmer from "../Shimmer/MovieCardShimmer";
import ListTitleShimmer from "../Shimmer/ListTitleShimmer";

const MovieList = React.memo(({ title, movies }) => {
  return (
    <div className="pl-3 md:pl-6 py-1 md-py-2 relative">
      {title ? (
        <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl py-2 sm:py-3 md:py-4">
          {title}
        </h3>
      ) : (
        <ListTitleShimmer />
      )}
      <div className="relative">
        <div className="flex overflow-x-scroll no-scrollbar">
          <div className="flex space-x-3">
            {movies && movies.length > 0
              ? movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    poster={movie.poster_path}
                  />
                ))
              : Array.from({ length: 10 }).map((_, index) => (
                  <MovieCardShimmer key={index} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieList;
