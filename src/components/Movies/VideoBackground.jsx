import { useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";

const VideoBackground = ({ id, isSmallScreen }) => {
  useMovieTrailer(id);
  const trailerKey = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="w-full h-full overflow-hidden absolute top-0 left-0">
      <iframe
        className={
          isSmallScreen
            ? "w-full h-full object-cover"
            : "w-[100%] h-[100%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        }
        src={`https://www.youtube.com/embed/${trailerKey?.key}?si=xuHkOwAWcmmSy5GI&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
