import { useSelector } from "react-redux";
import MovieGrid from "./Movies/MovieGrid";
import MainContainer from "./Movies/MainContainer";
import SecondaryContainer from "./Movies/SecondaryContainer";
import GptSearch from "./GPT/GptSearch";
import { backgroundImage } from "../constants/constants";

const ContentDisplay = ({ activeContent, onAddToWatchList }) => {
  const allMovies = useSelector((store) => store.movies);

  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return (
          <div className="relative">
            <MainContainer />
            <div className="relative z-20 bg-black">
              <SecondaryContainer onAddToWatchList={onAddToWatchList} />
            </div>
          </div>
        );
      case "tvShows":
        return (
          <div className="pt-32 px-8 bg-black min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">
              Top Rated TV Shows
            </h2>
            <MovieGrid
              movies={allMovies.topRatedTv}
              onAddToWatchList={onAddToWatchList}
            />
          </div>
        );
      case "movies":
        return (
          <div className="pt-32 px-8 bg-black min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">Movies</h2>
            <MovieGrid
              movies={allMovies.popularMovies}
              onAddToWatchList={onAddToWatchList}
            />
          </div>
        );

      case "GPT":
        return (
          <div className="relative min-h-screen">
            <div className="fixed inset-0">
              <img
                src={backgroundImage}
                alt="background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="relative z-10 pt-32 px-4">
              <h2 className="text-3xl font-bold text-white mb-6">
                Welcome to GPT Search
              </h2>
              <GptSearch />
            </div>
          </div>
        );

      case "watchlist":
        return (
          <div className="pt-32 px-8 bg-black min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">Watch List</h2>
            <MovieGrid
              movies={allMovies.watchList}
              onAddToWatchList={onAddToWatchList}
            />
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return <div className="bg-black">{renderContent()}</div>;
};

export default ContentDisplay;
