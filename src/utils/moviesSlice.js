import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    upcomingMovies: null,
    topRatedMovies: null,
    topRatedTv: null,
    watchList: [],
    likes: {},
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addTopRatedTv: (state, action) => {
      state.topRatedTv = action.payload;
    },
    addToWatchList: (state, action) => {
      if (!state.watchList.find((movie) => movie.id === action.payload.id)) {
        state.watchList.push(action.payload);
      }
    },
    toggleLike: (state, action) => {
      const movieId = action.payload.id;
      state.likes[movieId] = !state.likes[movieId];
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addUpcomingMovies,
  addTopRatedMovies,
  addTopRatedTv,
  addToWatchList,
  toggleLike,
} = moviesSlice.actions;

export default moviesSlice.reducer;
