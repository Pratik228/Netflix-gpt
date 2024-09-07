import { useState } from "react";
import { CDN_URL } from "../constants/constants";

const MovieCard = ({ posterPath, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-36 md:w-48 relative transition-all duration-200 ease-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full rounded-lg"
        src={CDN_URL + posterPath}
        alt={title}
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg p-2 flex flex-col justify-end hover:cursor-pointer">
          <h3 className="text-white font-bold">{title}</h3>
          <div className="flex justify-between items-center mt-2">
            <button className="bg-white text-black rounded-full p-1 w-8 h-8 flex items-center justify-center">
              ▶
            </button>
            <button className="border border-white text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
              +
            </button>
            <button className="border border-white text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
              👍
            </button>
            <button className="border border-white text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
              ▼
            </button>
          </div>
          <div className="mt-2">
            <span className="text-green-500 font-bold">98% Match</span>
            <span className="text-white ml-2">UA 13+</span>
          </div>
          <div className="mt-1 text-white text-sm">
            Charming • Feel-Good • Comedy
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
