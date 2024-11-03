import { API_OPTIONS } from "./constants";
import { addMetaData } from "./movieSlice";

export const fetchMoviePosterAndLogo = async (movieId, dispatch) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
      movieId +
        "/images?api_key=###&language=en-US&include_image_language=en,null",
      API_OPTIONS
    );

    const json = await data.json();

    const id = json?.id;
    const poster = json?.backdrops.find((poster) => poster?.iso_639_1 === "en") || json?.backdrops[0];
    const posterPath = poster?.file_path || "";

    const logo = json?.logos.find((poster) => poster?.iso_639_1 === "en") || json?.logos[0];
    const logoPath = logo?.file_path || "";

    const movieMetaData = {
      id: id,
      poster: posterPath,
      logo: logoPath,
    };

    dispatch(addMetaData(movieMetaData));

  } catch (error) {
    console.log("Server error, please try again");
  }
};
