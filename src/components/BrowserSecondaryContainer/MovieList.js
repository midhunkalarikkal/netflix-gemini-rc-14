import React from "react";
import MovieCard from "./MovieCard";

const MovieList = React.memo(({ title, movies }) => {
  return (
    <div className="pl-3 md:pl-6 py-1 md-py-2 relative">
      <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl py-4">
        {title}
      </h3>
      <div className="relative">
        <div className="flex overflow-x-scroll no-scrollbar">
          <div className="flex space-x-3">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movieId={movie.id} title={title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieList;
