import { useDispatch, useSelector } from "react-redux";
import { addSelectedForLarge, addSelectedMovie } from "../../utils/movieSlice";
import { toggleFullScreen } from "../../utils/loadingSlice";

const CardExpand = ({ movieId, list, trailer }) => {
  const dispatch = useDispatch()
  const movie = useSelector((store) => {
    const moviesList = store.movies?.[list];
    return moviesList?.find((movie) => movie.id === movieId);
  });

  const handleClose = () => {
    dispatch(addSelectedMovie(null));
  }

  const switchToLarge = () => {
    dispatch(addSelectedForLarge(trailer))
    dispatch(addSelectedMovie(null));
    dispatch(toggleFullScreen(true));
  }

  return (
    <div className="w-[100%] p-2 md:flex bg-black h-auto md:h-80 justify-center md:space-x-10">
      <div className="p-2 md:w-5/12 lg:w-4/12 flex justify-center">
        <iframe
          className="w-full aspect-video hover:border-2 border-red-600"
          src={`https://www.youtube.com/embed/${
            trailer || ""
          }?autoplay=1&controls=0&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="p-6 md:m-2 md:w-5/12 lg:w-4/12 relative bg-white bg-opacity-10 rounded-lg shadow-md text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-2 w-[90%]">
          {movie?.original_title || "Untitled"}
        </h2>
        <p className="text-xs md:text-sm mb-4">
          {movie?.overview || "No description available."}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-md md:text-lg font-medium">
            <span className="font-semibold">Rating: </span>⭐{" "}
            {movie?.vote_average || "N/A"}
          </p>
          <p className="text-md md:text-lg font-medium">
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
      <div className="py-2 hidden lg:block">
        <button className="text-xs md:text-md px-1 md:px-2 py-1 rounded-md bg-white text-gray-500 hover:border-[1px] hover:border-red-600 hover:bg-black hover:text-white" onClick={switchToLarge}>Full screen</button>
      </div>
      </div>
    </div>
  );
};

export default CardExpand;
