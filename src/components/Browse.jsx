import Header from "./Header";
import ContentDisplay from "./ContentDisplay";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTopRatedTv from "../hooks/useTopRatedTv";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToWatchList } from "../utils/moviesSlice";

const Browse = () => {
  const [activeContent, setActiveContent] = useState("home");
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTopRatedTv();
  useUpcomingMovies();

  const dispatch = useDispatch();

  const handleAddToWatchList = (movie) => {
    dispatch(addToWatchList(movie));
    toast.success(`${movie.title} added to watchlist!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-black min-h-screen">
      <ToastContainer />
      <Header onNavChange={setActiveContent} />
      <ContentDisplay
        activeContent={activeContent}
        onAddToWatchList={handleAddToWatchList}
      />
      {/* <MainContainer />
      <SecondaryContainer /> */}
    </div>
  );
};

export default Browse;
