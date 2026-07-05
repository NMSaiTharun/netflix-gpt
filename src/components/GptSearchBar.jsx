import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const langSelector = useSelector(
    (store) => store.languageConfig.currentLanguage,
  );
  console.log(lang[langSelector].search);
  return (
    <div className="pt-[20%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 bg-amber-50 col-span-9"
          placeholder={lang[langSelector].gptSearchPlaceHolder}
        />
        <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3 text-2xl cursor-pointer">
          {lang[langSelector].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
