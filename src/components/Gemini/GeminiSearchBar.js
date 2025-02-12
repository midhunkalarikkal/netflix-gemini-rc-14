import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import model from "../../utils/gemini";
import lang from "../../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { addGeminiMovieResult, addRequestCount, resetRequestCount } from "../../utils/geminiSlice";
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
  const [geminiSearched, setGeminiSearched] = useState(false);
  const requestCount = useSelector((store) => store.gemini.requestCount);
  const timeoutId = useRef(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const lastReset = localStorage.getItem("lastRequestReset");
    const today = new Date().toLocaleDateString();

    if (lastReset !== today) {
      dispatch(resetRequestCount());
      localStorage.setItem("lastRequestReset", today);
    }

    let countdownInterval;

    if (geminiSearched) {
      setCooldownRemaining(180);
      countdownInterval = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdownInterval);
      setCooldownRemaining(0);
    }

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timeoutId.current);
    };
  }, [geminiSearched, dispatch]);

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
    if (geminiSearched) {
      toast.info("Sorry, You have to wait until the timer ends.");
      return;
    }

    if (requestCount > 5) {
      toast.info("Sorry, You have reached daily search limit.");
      return;
    }

    const gptQuery = GEMINI_QUERY_INITAL + searchText.current.value + GEMINI_QUERY_END;

    toast.promise(
      (async () => {
        try {
          const result = await model.generateContent(gptQuery);
          dispatch(addRequestCount());

          const movies = result.response.text().split(",");
          const promiseArray = movies.map((movie) => searchMovie(movie));
          const searchedMoviesData = await Promise.all(promiseArray);
          dispatch(
            addGeminiMovieResult({
              movieNames: movies,
              geminiTmdbResults: searchedMoviesData,
            })
          );

          setGeminiSearched(true);
          timeoutId.current = setTimeout(() => setGeminiSearched(false), 180000);
          return "Movies fetched successfully!";

        } catch (error) {
          console.error("Gemini API Error:", error);
          setGeminiSearched(false);
          throw error;
        }
      })(),
      {
        pending: "Fetching movie recommendations...",
        success: "Movies fetched successfully!",
        error: "Failed to fetch movies. Try again!",
      }
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
        {geminiSearched && (
          <div className="text-white ml-2 p-1 md:px-5 md:py-3 text-xs md:text-md bg-black bg-opacity-60 border border-[#E50914] rounded-lg shadow-md shadow-[#E50914]">
            {formatTime(cooldownRemaining)}
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
