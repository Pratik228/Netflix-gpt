import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  useMovieTrailer(id);
  const trailerKey = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="w-screen aspect-video overflow-hidden absolute top-0 left-0 z-0">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailerKey?.key}?si=xuHkOwAWcmmSy5GI&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
