import { API_OPTIONS, YOUTUBE_WATCH_URL } from "../constants/constants";

const VideoTitle = ({ movie }) => {
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
  return (
    <div className="w-full pt-[28%] px-24 text-white">
      <h1 className="text-5xl font-bold max-w-xl">{movie.original_title}</h1>
      <p className="py-6 text-lg max-w-lg">{movie.overview}</p>
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
