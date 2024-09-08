import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="px-4 mx-auto max-w-screen-xl">
      <div className="mt-8 text-white">
        {movieNames.map((movieName, index) => (
          <div key={movieName} className="mb-8">
            <MovieList title={movieName} movies={movieResults[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
