import { useRef } from "react";
import { toast } from "react-toastify";
import model from "../../utils/gemini";
import lang from "../../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { addGeminiMovieResult } from "../../utils/geminiSlice";
import {
  API_OPTIONS,
  GEMINI_QUERY_END,
  GEMINI_QUERY_INITAL,
  GEMINI_SEARCH_API_INITIAL,
  GEMINI_SEARCH_API_END,
} from "../../utils/constants";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const searchMovie = async (movieName) => {
    const data = await fetch(
      GEMINI_SEARCH_API_INITIAL + movieName + GEMINI_SEARCH_API_END,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (searchText.current.value === "") {
      toast.info("Empty Input.");
      return;
    }
    const gptQuery =
      GEMINI_QUERY_INITAL + searchText.current.value + GEMINI_QUERY_END;

    toast.promise(
      (async () => {
        const result = await model.generateContent(gptQuery);
        const movies = result.response.text().split(",");
        const promiseArray = movies.map((movie) => searchMovie(movie));
        const searchedMoviesData = await Promise.all(promiseArray);
        dispatch(
          addGeminiMovieResult({
            movieNames: movies,
            geminiTmdbResults: searchedMoviesData,
          })
        );
      })(),
      {
        pending: "Fetching movie recommendations...",
        success: "Movies fetched successfully!",
        error: "Failed to fetch movies. Try again!",
      }
    );
  };

  return (
    <div className="flex w-full p-2 md:p-10 items-center justify-center">
      <form
        className="flex w-full md:w-1/2 items-center justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="w-8/12 p-1 md:px-5 md:py-3 text-xs md:text-md rounded-lg shadow-md shadow-white"
          type="text"
          placeholder={lang[langKey].searchPlaceHolder}
        />
        <button
          className="w-2/12 mx-2 p-1 md:px-5 md:py-3 text-xs md:text-md bg-[#E50914] text-white md:text-md font-bold rounded-lg shadow-md shadow-[#E50914]"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
