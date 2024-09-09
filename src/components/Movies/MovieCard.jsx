import { useState } from "react";
import {
  CDN_URL,
  YOUTUBE_WATCH_URL,
  API_OPTIONS,
} from "../../constants/constants";
import { addToWatchList, toggleLike } from "../../utils/moviesSlice";
import { useDispatch } from "react-redux";

const MovieCard = ({ movie, onAddToWatchList }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToWatchList = () => {
    onAddToWatchList(movie);
  };

  const handleLike = () => {
    dispatch(toggleLike(movie));
  };

  const handlePlayTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();
      const trailers = data.results.filter((video) => video.type === "Trailer");
      const trailer = trailers.length > 0 ? trailers[0] : data.results[0];

      if (trailer) {
        window.open(`${YOUTUBE_WATCH_URL}${trailer.key}`, "_blank");
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Error fetching trailer. Please try again.");
    }
  };

  const matchPercentage = Math.round((movie.vote_average / 10) * 100) || 0;

  return (
    <div
      className="w-36 md:w-48 h-54 md:h-72 relative transition-all duration-200 ease-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {movie.poster_path ? (
        <img
          className="w-full h-full object-cover rounded-lg"
          src={CDN_URL + movie.poster_path}
          alt={movie.title}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
          <p className="text-white text-center p-4">No Image Available</p>
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg p-3 flex flex-col justify-end hover:cursor-pointer">
          <h3 className="text-white font-bold text-sm md:text-base">
            {movie.title}
          </h3>
          <div>
            <div className="flex justify-between items-center mb-2">
              <button
                className="bg-white text-black rounded-full p-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm"
                onClick={handlePlayTrailer}
              >
                ▶
              </button>
              <button
                onClick={handleAddToWatchList}
                className="border border-white text-white rounded-full p-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm"
              >
                +
              </button>
              <button
                onClick={handleLike}
                className="border border-white text-white rounded-full p-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm"
              >
                👍
              </button>
            </div>
            <div className="text-xs md:text-sm">
              <span className="text-green-500 font-bold">
                {matchPercentage}% Match
              </span>
              <span className="text-white ml-2">
                {movie.adult ? "A" : "13+"}
              </span>
            </div>
            <div className="mt-1 text-white text-xs">
              {movie.original_language?.toUpperCase() || "N/A"} •{" "}
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
