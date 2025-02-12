import React from "react";
import { useDispatch } from "react-redux";
import { IMG_CDN } from "../../utils/constants";
import { addSelectedMovie } from '../../utils/movieSlice';
import MovieCardShimmer from "../Shimmer/MovieCardShimmer";

const MovieCard = React.memo(({ movieId, poster, title }) => {
  
  const dispatch = useDispatch();
  const onClickHandle = (movieId,title) => {
    dispatch(addSelectedMovie({movieId, title}))
  };

  return (
    <div
      className="w-24 md:w-44 lg:w-52 overflow-x bg-black relative"
      onClick={() => onClickHandle(movieId,title)}
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
