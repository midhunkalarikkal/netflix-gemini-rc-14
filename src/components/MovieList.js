import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieListShimmer from "./Shimmer/MovieListShimmer";

const MovieList = ({ title, movies }) => {
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    if (movies) {
      setListLoading(false);
    }
  }, [movies]);

  return (
    <div className="pl-3 md:pl-6 py-1 md-py-2 relative">
      {listLoading ? (
        <MovieListShimmer />
      ) : (
        <>
          <h3 className="text-white font-bold text-lg md:text-2xl lg:text-3xl py-4">
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
        </>
      )}
    </div>
  );
};

export default MovieList;
