import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useGetMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log("json : ",json)
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length !== 0 ? filterData[0] : json.results[0];
    const tailerData = {
      trailer : trailer,
      movieId : movieId
    }
    dispatch(addTrailerVideo(tailerData));
  };
  
    getMovieVideo();
  }, [movieId,dispatch]);
};

export default useGetMovieTrailer;
