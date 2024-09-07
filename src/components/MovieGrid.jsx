import React, { useState } from "react";
import { CDN_URL } from "../constants/constants";

const MovieGrid = ({ movies }) => {
  if (!movies) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {movies.map((movie) => (
        <MovieGridItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

const MovieGridItem = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg">
        <img
          src={CDN_URL + movie.poster_path}
          alt={movie.title || movie.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        />
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-3 z-10">
          <h3 className="text-white font-bold text-lg mb-2">
            {movie.title || movie.name}
          </h3>
          <div className="flex items-center space-x-1 mb-2">
            <button className="bg-white text-black rounded-full p-1 w-10 h-10 flex items-center justify-center text-xl hover:bg-opacity-80">
              ▶
            </button>
            <button className="border-2 border-gray-400 text-white rounded-full p-1 w-10 h-10 flex items-center justify-center text-xl hover:border-white">
              +
            </button>
            <button className="border-2 border-gray-400 text-white rounded-full p-1 w-10 h-10 flex items-center justify-center text-xl hover:border-white">
              👍
            </button>
            <button className="border-2 border-gray-400 text-white rounded-full ml-auto w-10 h-10 flex items-center justify-center text-xl hover:border-white">
              ▼
            </button>
          </div>
          <div className="flex items-center mb-1">
            <span className="text-green-500 font-bold text-sm">98% Match</span>
            <span className="text-white ml-2 text-sm border border-gray-400 px-1">
              UA 13+
            </span>
          </div>
          <div className="text-white text-xs">
            Charming • Feel-Good • Comedy
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
