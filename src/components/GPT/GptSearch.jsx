import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
const GptSearch = ({ onAddToWatchList }) => {
  return (
    <div>
      <GptSearchBar />
      <GptMovieSuggestions onAddToWatchList={onAddToWatchList} />
    </div>
  );
};

export default GptSearch;
