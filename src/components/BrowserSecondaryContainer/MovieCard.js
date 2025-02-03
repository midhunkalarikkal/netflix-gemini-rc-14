import React, { useState } from "react";
import { IMG_CDN } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedMovie } from "../../utils/movieSlice";

const MovieCard = React.memo(({ movieId, title }) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  let movieToSelect = {};
  const metaData = useSelector((store) =>
    store.movies?.metaData.find((movie) => movie.id === movieId)
  );

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const trailerData = useSelector((store) =>
    store.movies?.trailerVideo.find((trailer) => trailer.movieId === movieId)
  );

  if (trailerData) {
    movieToSelect = {
      ...trailerData,
      title: title || "Untitled Movie",
    };
  }
  
  const onClickHandle = () => {
    dispatch(addSelectedMovie(movieToSelect));
  };

  return (
    <div
      className="w-36 md:w-48 lg:w-72 overflow-x bg-black relative"
      onClick={onClickHandle}
    >
      {imageLoading && !metaData?.poster ? (
        <div className="shimmer w-full h-full aspect-video absolute inset-0"></div>
      ) : (
        <div className="relative">
          {metaData?.poster ? (
            <img
              src={IMG_CDN + metaData.poster}
              alt="movie_poster"
              className="w-full h-full"
              onLoad={handleImageLoad}
            />
          ) : null}
        </div>
      )}
    </div>
  );
});

export default MovieCard;
