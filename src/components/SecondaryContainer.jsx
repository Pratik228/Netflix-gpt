import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const allMovies = useSelector((store) => store.movies);

  if (!allMovies || !allMovies.nowPlayingMovies) {
    return;
  }
  return (
    <div className="bg-black min-h-screen relative z-20 -mt-[8%] pt-2">
      <MovieList title={"Now Playing"} movies={allMovies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={allMovies.popularMovies} />
      <MovieList title={"Top Rated"} movies={allMovies.topRatedMovies} />
      <MovieList title={"Top Rated TV Shows"} movies={allMovies.topRatedTv} />
      <MovieList title={"Upcoming"} movies={allMovies.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
