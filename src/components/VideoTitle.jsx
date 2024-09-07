const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute top-0 left-0 pt-[20%] px-24 text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold max-w-xl">{title}</h1>
      <p className="py-6 text-lg max-w-lg">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-white text-black py-3 px-10 text-xl rounded-lg hover:bg-opacity-80 transition">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-3 px-10 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
