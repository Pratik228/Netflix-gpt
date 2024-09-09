import EnhancedMovieGridItem from "../HOC/EnhancedMovieGridItem";

const MovieGrid = ({ movies, onAddToWatchList }) => {
  if (!movies) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {movies.map((movie) => (
        <EnhancedMovieGridItem
          key={movie.id}
          movie={movie}
          onAddToWatchList={onAddToWatchList}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
