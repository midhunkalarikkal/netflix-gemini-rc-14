import React from "react";
import { IMG_CDN } from "../../utils/constants";
import MovieCardShimmer from "../Shimmer/MovieCardShimmer";

const MovieCard = React.memo(({ movieId, poster }) => {
  
  const onClickHandle = () => {};

  return (
    <div
      className="w-24 md:w-44 lg:w-52 overflow-x bg-black relative"
      onClick={onClickHandle}
    >
      {!poster ? (
        <MovieCardShimmer />
      ) : (
        <img
          src={IMG_CDN + poster}
          alt="movie_poster"
          className="w-full h-full"
        />
      )}
    </div>
  );
});

export default MovieCard;
