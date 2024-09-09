import EnhancedMovieCard from "../HOC/EnhancedMovieCard";

const MovieList = ({ title, movies, onAddToWatchList }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-8 py-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white">
        {title}
      </h2>
      <div className="relative">
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth">
          <div className="flex pb-4 pt-2 sm:pb-8 sm:pt-4 space-x-2 sm:space-x-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="w-[45vw] sm:w-auto sm:pr-2 flex-shrink-0 sm:flex-shrink transition-all duration-200 ease-in hover:scale-105 sm:hover:scale-125 hover:z-10"
              >
                <EnhancedMovieCard
                  movie={movie}
                  onAddToWatchList={onAddToWatchList}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
