import { useSelector } from "react-redux";
import { IMG_CDN } from "../utils/constants";
import React, { useState } from "react";

const MovieCard = ({ movieId }) => {
  const [hovered , setHovered] = useState(false)

  const handleHover = () => {
    setHovered(true)
  }

  const onMouseLeave = () => {
    setHovered(false)
  }

  const metaData = useSelector((store) =>
    store.movies?.metaData.find((movie) => movie.id === movieId)
  );

  const trailerData = useSelector((store) => store.movies?.trailerVideo.find((trailer) => trailer.movieId === movieId));
  
  return (
    <div className="w-72 overflow-x" onMouseEnter={handleHover} onMouseLeave={onMouseLeave}>
       {hovered ? (
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerData?.trailer?.key}?autoplay=1&controls=0&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <img
          src={IMG_CDN + metaData?.poster}
          alt="movie_poster"
          className="w-full"
        />
      )}
    </div>
  );
};

export default MovieCard;
