import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Something Went Wrong
        </h2>
        <p className="text-gray-600 mb-6">We are trying to reconnect...</p>
        <p className="text-sm text-gray-500 mb-6">
          Error: {err.status} - {err.statusText}
        </p>
        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
