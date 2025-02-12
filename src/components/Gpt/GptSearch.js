import React from "react";
import GptSearchBar from "./GptSearchBar";
import { LOGIN_BG_IMAGE } from "../../utils/constants";
import GptSearchSuggestions from "./GptSearchSuggestions";

const GptSearch = () => {

  return (
    <div className="w-screen min-h-screen pt-10 md:p-10 relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-50"></div>
        <img
          className="w-screen min-h-screen sm:h-[90vh] object-cover"
          src={LOGIN_BG_IMAGE}
          alt="background_image"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <GptSearchBar />
        <div className="w-full max-h-[85vh] md:max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 no-scrollbar">
          <GptSearchSuggestions />
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
