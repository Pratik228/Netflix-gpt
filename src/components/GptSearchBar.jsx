import { backgroundImage } from "../constants/constants";
import lang from "../constants/languageConstant";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="flex justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <form className="p-6 m-6 z-10 w-full bg-transparent grid grid-cols-12 items-center gap-4 max-w-4xl">
        <input
          type="text"
          className="p-4 col-span-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button className="col-span-3 bg-red-600 rounded-xl hover:bg-red-800 px-2 py-4 transition-all text-white">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
