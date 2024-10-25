import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="pl-6 py-2">
      <h3 className="text-white font-bold  text-3xl py-4">{title}</h3>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex space-x-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movieId={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
