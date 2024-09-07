import Header from "./Header";
import ContentDisplay from "./ContentDisplay";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTopRatedTv from "../hooks/useTopRatedTv";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useState } from "react";

const Browse = () => {
  const [activeContent, setActiveContent] = useState("home");
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTopRatedTv();
  useUpcomingMovies();

  return (
    <div className="bg-black min-h-screen">
      <Header onNavChange={setActiveContent} />
      <ContentDisplay activeContent={activeContent} />
      {/* <MainContainer />
      <SecondaryContainer /> */}
    </div>
  );
};

export default Browse;
