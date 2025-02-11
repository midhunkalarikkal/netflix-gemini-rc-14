import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN } from "../../utils/constants";

const GptSearchSuggestions = () => {
  const { movieNames, geminiMovieResults } = useSelector(
    (store) => store.gemini
  );

  if (!movieNames) return null;

  return (
    <div className="w-full p-10">
      {movieNames.map((movieName, index) => (
        <div key={index} className="mt-2">
          <h5 className="font-bold text-white text-sm sm:text-lg md:text-xl">{movieName}</h5>
          <div className="flex overflow-x-scroll no-scrollbar">
            <div className="flex space-x-3">
              {geminiMovieResults[index].map((movie, index) => (
                movie.poster_path &&
                <img key={index} src={IMG_CDN+movie.poster_path} alt="poster" className="h-32 sm:h-48 md:h-64"/>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GptSearchSuggestions;
