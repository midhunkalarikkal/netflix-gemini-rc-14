import React from "react";

const MovieListShimmer = () => {
  return (
    <div className="flex flex-col mt-3">
      <div className="shimmer w-3/12 h-8 bg-gray-500 mb-4"></div>
      <div className="relative">
        <div className="flex overflow-x-scroll no-scrollbar">
          <div className="flex space-x-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="shimmer w-36 md:w-48 lg:w-72 h-24 md:h-32 lg:h-48 bg-gray-500 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListShimmer;
