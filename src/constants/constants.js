export const NORMAL_IMG =
  "https://occ-0-2610-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229";

export const backgroundImage =
  "https://staticg.sportskeeda.com/editor/2024/08/907c1-17231340015999-1920.jpg";

export const avatar = "https://avatars.githubusercontent.com/u/58130071?v=4";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};
// constants/constants.js
export const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";

export const SAMPLE_EMAIL = "pratik3@gmail.com";
export const SAMPLE_PASSWORD = "Pra1234@";

export const CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "german", name: "German" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "punjabi", name: "Punjabi" },
];

export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
