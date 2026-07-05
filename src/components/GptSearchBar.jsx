const GptSearchBar = () => {
  return (
    <div className="pt-[20%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 bg-amber-50 col-span-9"
          placeholder="Search for latest movies?"
        />
        <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3 text-2xl cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
