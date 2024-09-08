import { API_OPTIONS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTopRatedTv } from "../utils/moviesSlice";

const useTopRatedTv = () => {
  const dispatch = useDispatch();
  const topRatedTv = useSelector((store) => store.movies.topRatedTv);
  const getTopRatedTv = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedTv(json.results));
  };

  useEffect(() => {
    !topRatedTv && getTopRatedTv();
  }, []);
};

export default useTopRatedTv;
