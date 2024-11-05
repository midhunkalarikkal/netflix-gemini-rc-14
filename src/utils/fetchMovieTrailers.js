import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "./movieSlice";

export const fetchMovieTrailer = async (movieId ,list,dispatch) => {
    try{
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/videos?language=en-US",
            API_OPTIONS
        );
        
        const json = await data.json();
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length !== 0 ? filterData[0] : json.results[0];
        const tailerData = {
            trailer : trailer,
            movieId : movieId,
            list : list
        }
        dispatch(addTrailerVideo(tailerData));

    }catch(error){
       
    }
  };

