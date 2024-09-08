import lang from "../constants/languageConstant";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../constants/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { useDispatch } from "react-redux";
import Shimmer from "./Shimmer";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //search Movie in tmdb

  const searchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearch = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      //Making API call
      const gptQuery =
        "Act as a Movie recommendation system and suggest some movies name for the query: " +
        searchText.current.value +
        ". only give me names of 5 movies with comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Jawan, Koi Mil Gaya";
      const gptResults = await client.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      if (!gptResults.choices) {
        setErrorMessage("Result not Found");
      }
      const gptMoviesList =
        gptResults.choices?.[0]?.message?.content.split(", ");

      //For each movie we will find the movies
      const movies = gptMoviesList.map((movie) => searchMovie(movie));
      // we will get array of promise here for all 5 not the result remember this[]
      //to get the data we have to use Promise.all to get all the results

      const tmdbResults = await Promise.all(movies);

      //tmdbresults will have all the results
      dispatch(
        addGptMovieResult({
          movieNames: gptMoviesList,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      setErrorMessage("An error occurred during search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        className="grid grid-cols-12 items-center gap-4 mt-20"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 col-span-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          type="button"
          className="col-span-3 bg-red-600 rounded-xl hover:bg-red-800 px-2 py-4 transition-all text-white"
          onClick={handleGptSearch}
        >
          {lang[langKey].search}
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-600 font-bold text-lg mt-4 text-center">
          {errorMessage}
        </p>
      )}

      {isLoading && (
        <div className="mt-8">
          <Shimmer />
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
