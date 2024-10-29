import { useDispatch, useSelector } from "react-redux";
import { addSelectedMovie } from "../utils/movieSlice";

const CardExpand = ({ movieId, list, trailer }) => {
  const dispatch = useDispatch()
  const movie = useSelector((store) => {
    const moviesList = store.movies?.[list];
    return moviesList?.find((movie) => movie.id === movieId);
  });

  const handleClose = () => {
    dispatch(addSelectedMovie(null))
  }

  return (
    <div className="w-[100%] p-2 flex bg-black h-80 justify-center space-x-10">
      <div className="p-2 w-4/12 flex justify-center">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${
            trailer || ""
          }?autoplay=1&controls=0&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="p-6 m-2 w-4/12 relative bg-white bg-opacity-10  rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-bold mb-2">
          {movie?.original_title || "Untitled"}
        </h2>
        <p className="text-sm mb-4">
          {movie?.overview || "No description available."}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-medium">
            <span className="font-semibold">Rating: </span>⭐{" "}
            {movie?.vote_average || "N/A"}
          </p>
          <p className="text-lg font-medium">
            <span className="font-semibold">Release Date: </span>
            {movie?.release_date || "N/A"}
          </p>
        </div>
        <button
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white font-bold text-2xl rounded-full w-8 h-8 flex items-center justify-center"
          aria-label="Close" onClick={handleClose}
        >
          ^
        </button>
      </div>
    </div>
  );
};

export default CardExpand;
