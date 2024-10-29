import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN } from "../utils/constants";
import { changeCoordinates, changeHover } from "../utils/movieSlice";
import React from "react";

const MovieCard = ({ movieId }) => {
  const dispatch = useDispatch();

  const metaData = useSelector((store) =>
    store.movies?.metaData.find((movie) => movie.id === movieId)
  );

  const isCardHover = () => {
    dispatch(changeHover({ value: true, movieId }));
  };

  const isCardNotHover = () => {
    dispatch(changeHover({}));
    dispatch(changeCoordinates({}));
  };


  return (
    <div
      className="w-72 overflow-x"
      onMouseEnter={isCardHover}
      onMouseLeave={isCardNotHover}
    >
      <img
        src={IMG_CDN + metaData?.poster}
        alt="movie_poster"
        className="w-full"
      />
    </div>
  );
};

export default MovieCard;
