import AuthForm from "./AuthForm";
import Browse from "./Browse";
import Error from "./Error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AuthForm />,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <AuthForm />,
    },
    {
      path: "/signup",
      element: <AuthForm />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
