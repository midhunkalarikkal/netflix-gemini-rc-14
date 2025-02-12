import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../BrowserSecondaryContainer/MovieList";

const GeminiSearchSuggestion = () => {
  
  const { movieNames, geminiMovieResults } = useSelector(
    (store) => store.gemini
  );

  if (!movieNames) return null;

  return (
    <div className="w-full p-10">
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={geminiMovieResults[index]}
          gemini={true}
        />
      ))}
    </div>
  );
};

export default GeminiSearchSuggestion;
