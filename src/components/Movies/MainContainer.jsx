import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useSmallScreen from "../../hooks/useSmallScreen";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const isSmallScreen = useSmallScreen();

  if (!movies) return null;

  return (
    <div
      className={
        isSmallScreen
          ? "relative h-[50vh] mb-4"
          : "relative pt-[calc(56.25%+4rem)] md:aspect-video"
      }
    >
      <VideoBackground id={movies[0].id} isSmallScreen={isSmallScreen} />
      <div
        className={
          isSmallScreen
            ? "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            : "absolute inset-0 bg-gradient-to-r from-black"
        }
      >
        <VideoTitle movie={movies[0]} isSmallScreen={isSmallScreen} />
      </div>
    </div>
  );
};

export default MainContainer;
