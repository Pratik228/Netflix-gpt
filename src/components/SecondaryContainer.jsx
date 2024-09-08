import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const allMovies = useSelector((store) => store.movies);

  if (!allMovies || !allMovies.nowPlayingMovies) {
    return null;
  }
  return (
    <div className="bg-black relative z-20 -mt-20 md:-mt-32 lg:-mt-40">
      <div className="relative pb-8 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="relative z-10">
          <MovieList
            title={"Now Playing"}
            movies={allMovies.nowPlayingMovies}
          />
          <MovieList title={"Popular"} movies={allMovies.popularMovies} />
          <MovieList title={"Top Rated"} movies={allMovies.topRatedMovies} />
          <MovieList
            title={"Top Rated TV Shows"}
            movies={allMovies.topRatedTv}
          />
          <MovieList title={"Upcoming"} movies={allMovies.upcomingMovies} />
        </div>
      </div>
    </div>
  );
};

export default SecondaryContainer;
