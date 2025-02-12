import React from "react";
import GeminiSearchBar from "./GeminiSearchBar";
import { LOGIN_BG_IMAGE } from "../../utils/constants";
import GeminiSearchSuggestion from "./GeminiSearchSuggestion";

const GeminiSearch = () => {

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
        <GeminiSearchBar />
        <div className="w-full max-h-[85vh] md:max-h-[70vh] overflow-y-auto no-scrollbar">
          <GeminiSearchSuggestion />
        </div>
      </div>
    </div>
  );
};

export default GeminiSearch;
