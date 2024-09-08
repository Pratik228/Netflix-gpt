import EnhancedMovieCard from "./EnhancedMovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="px-8 py-4">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="relative">
        {/* Horizontal scrolling container with hidden scrollbars */}
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth">
          <div className="flex pb-8 pt-4 px-4 space-x-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="pr-2 transition-all duration-200 ease-in hover:scale-125 hover:z-10"
              >
                <EnhancedMovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
