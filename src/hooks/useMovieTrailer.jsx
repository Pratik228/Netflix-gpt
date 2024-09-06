import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../constants/constants";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();
  const movieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    movieTrailer();
  }, []);
};

export default useMovieTrailer;
