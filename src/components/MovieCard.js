import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN } from "../utils/constants";
import React, { useState } from "react";
import { addSelectedMovie } from "../utils/movieSlice";

const MovieCard = React.memo(({ movieId, title }) => {
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);

  const [hoverTimeout, setHoverTimeout] = useState(null);

  const [imageLoading, setImageLoading] = useState(true);

  let movieToSelect = {};

  const handleHover = () => {
    if (window.innerWidth >= 768) {
      const timeoutId = setTimeout(() => {
        setHovered(true);
      }, 1000);
      setHoverTimeout(timeoutId);
    }
  };

  const onMouseLeave = () => {
    setHovered(false);
    clearTimeout(hoverTimeout);
  };

  const metaData = useSelector((store) =>
    store.movies?.metaData.find((movie) => movie.id === movieId)
  );
  
  const handleImageLoad = () => {
        setImageLoading(false);
  }

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
      onMouseEnter={handleHover}
      onMouseLeave={onMouseLeave}
      onClick={onClickHandle}
    >
      {hovered ? (
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerData?.trailer?.key}?autoplay=1&controls=0&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <>
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
      </>
      )}
    </div>
  );
});

export default MovieCard;
