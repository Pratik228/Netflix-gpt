import {
  CDN_URL,
  YOUTUBE_WATCH_URL,
  API_OPTIONS,
} from "../../constants/constants";
import { toggleLike } from "../../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { FaPlay, FaPlus, FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const MovieGridItem = ({ movie, onAddToWatchList }) => {
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
      className="relative group aspect-w-2 aspect-h-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {movie.poster_path ? (
        <img
          src={CDN_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
          <p className="text-white text-center p-4">No Image Available</p>
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg p-3 flex flex-col justify-end hover:cursor-pointer">
          <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <button
              className="bg-white text-black rounded-full p-2 w-10 h-10 flex items-center justify-center text-xl hover:bg-opacity-80"
              onClick={handlePlayTrailer}
            >
              <FaPlay />
            </button>
            <button
              onClick={handleAddToWatchList}
              className="border-2 border-gray-400 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-xl hover:border-white"
            >
              <FaPlus />
            </button>
            <button
              onClick={handleLike}
              className="border-2 border-gray-400 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-xl hover:border-white"
            >
              <FaThumbsUp />
            </button>
          </div>
          <div className="flex items-center mb-1">
            <span className="text-green-500 font-bold text-sm">
              {matchPercentage}% Match
            </span>
            <span className="text-white ml-2 text-sm border border-gray-400 px-1">
              {movie.adult ? "A" : "13+"}
            </span>
          </div>
          <div className="text-white text-xs">
            {movie.original_language?.toUpperCase() || "N/A"} •{" "}
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGridItem;
