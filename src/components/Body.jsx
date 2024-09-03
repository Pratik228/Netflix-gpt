import Login from "./Login";
import Browse from "./Browse";
import Signup from "./Signup";
import Error from "./Error";
import Header from "./Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login />, errorElement: <Error /> },
    { path: "/browse", element: <Browse /> },
    { path: "/signup", element: <Signup /> },
  ]);
  return (
    <div className="flex-glow">
      <Header />
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
