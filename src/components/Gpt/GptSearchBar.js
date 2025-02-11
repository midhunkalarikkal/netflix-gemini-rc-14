import { useRef } from "react";
import openai from "../../utils/opeai";
import lang from "../../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act a as movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Godar, Sholay, Koi Mil Gaya, Pathan, Ra-One";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
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
