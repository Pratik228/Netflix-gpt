import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useEffect, useState } from "react";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    if (movies) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMainMovie(movies[randomIndex]);
    }
  }, [movies]);

  if (!mainMovie) return null;

  return (
    <div className="relative pt-[56.25%] md:aspect-video">
      <VideoBackground id={mainMovie.id} />
      <div className="absolute inset-0 bg-gradient-to-r from-black">
        <VideoTitle movie={mainMovie} />
      </div>
    </div>
  );
};

export default MainContainer;
