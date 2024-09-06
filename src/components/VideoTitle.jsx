const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute top-0 left-0 pt-[20%] px-24 text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-white text-black py-4 px-12 text-xl rounded-lg hover:bg-opacity-60 transition">
          ▶️ Play
        </button>
        <button className="bg-gray-500 text-white py-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
