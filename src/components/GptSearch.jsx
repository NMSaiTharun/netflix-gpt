import { BACKGROUND_IMG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed w-full h-full -z-10">
        <img
          // className="w-full h-full object-cover"
          className="h-screen w-screen object-cover"
          src={BACKGROUND_IMG_URL}
          alt="logo"
        />
      </div>
      <div className="pt-[25%] md:p-0">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
