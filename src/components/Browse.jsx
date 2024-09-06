import Header from "./Header";

const Browse = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16">
        {" "}
        {/* Add padding-top to account for fixed header */}
        <div className="w-full h-[56.25vw] bg-cover bg-center">
          {/* Content for the main featured content */}
        </div>
        {/* Rest of your browse content */}
      </div>
    </div>
  );
};

export default Browse;
