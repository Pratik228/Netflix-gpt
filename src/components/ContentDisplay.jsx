import { useSelector } from "react-redux";
import MovieGrid from "./MovieGrid";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

const ContentDisplay = ({ activeContent }) => {
  const allMovies = useSelector((store) => store.movies);

  const renderContent = () => {
    switch (activeContent) {
      case "home":
        return (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        );
      case "tvShows":
        return (
          <div className="pt-32 px-8 bg-black min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">
              Top Rated TV Shows
            </h2>
            <MovieGrid movies={allMovies.topRatedTv} />
          </div>
        );
      case "movies":
        return (
          <div className="pt-32 px-8 bg-black min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">Movies</h2>
            <MovieGrid movies={allMovies.popularMovies} />
          </div>
        );

      case "GPT":
        return (
          <div className="pt-32 px-8 bg-black min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">
              {" "}
              Welcome to GPT Search
            </h2>
            <GptSearch />
          </div>
        );
      default:
        return <div>Content not found</div>;
    }
  };

  return <div className="bg-black">{renderContent()}</div>;
};

export default ContentDisplay;
