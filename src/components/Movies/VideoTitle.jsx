import { API_OPTIONS, YOUTUBE_WATCH_URL } from "../../constants/constants";
import { useState } from "react";

const VideoTitle = ({ movie, isSmallScreen }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };
  if (isSmallScreen) {
    return (
      <div className="absolute inset-0 flex flex-col justify-end p-14 text-white">
        <h1 className="text-sm font-semibold mb-2 ">{movie.original_title}</h1>
        <p className="text-xs mb-4 line-clamp-2">{movie.overview}</p>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={handlePlayTrailer}
            className="bg-white text-black py-2 text-xs rounded-lg hover:bg-opacity-80 transition flex-grow"
          >
            ▶️ Play
          </button>
          <button className="bg-gray-500 text-white py-2 text-xs bg-opacity-50 rounded-lg hover:bg-opacity-80 transition flex-grow">
            ℹ More Info
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-[25%] px-24 text-white">
      <h1 className="text-5xl font-bold max-w-xl">{movie.original_title}</h1>
      <div className="py-6 text-lg max-w-lg">
        {showFullDescription ? (
          <p>{movie.overview}</p>
        ) : (
          <p>{truncateDescription(movie.overview, 150)}</p>
        )}
        {movie.overview.length > 150 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-700"
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handlePlayTrailer}
          className="bg-white text-black py-3 px-10 text-xl rounded-lg hover:bg-opacity-80 transition"
        >
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-3 px-10 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
