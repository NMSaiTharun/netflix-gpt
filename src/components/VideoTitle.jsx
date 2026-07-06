const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-16 absolute text-white  bg-gradient-to-l to-black">
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-md w-1/4">{overview}</p>
      <div className="">
        <button className="bg-white text-black my-2 md:my-0 py-1  md:py-2  px-3 md:px-4 text-xl rounded-lg font-bold hover:bg-gray-400 cursor-pointer">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block my-2 md:my-1 md:mx-2 bg-gray-500 text-white py-2 px-2 text-xl rounded-lg font-bold cursor-pointer">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
