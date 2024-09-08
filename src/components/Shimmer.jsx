const ShimmerCard = () => (
  <div className="bg-gray-700 bg-opacity-30 rounded-lg overflow-hidden shadow-lg animate-pulse">
    <div className="h-64 bg-gray-600 bg-opacity-50"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-600 bg-opacity-50 rounded w-3/4"></div>
      <div className="h-4 bg-gray-600 bg-opacity-50 rounded w-1/2"></div>
    </div>
  </div>
);

const Shimmer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
