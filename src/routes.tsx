import { Navigate, useRoutes } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import Users from "./pages/Users";

type Props = {};

const Router = (props: Props) => {
  return useRoutes([
    {
      path: "users",
      children: [
        {
          path: "",
          element: <Users />,
        },
        { path: "create", element: <CreateUser /> },
        { path: ":id", element: <UpdateUser /> },

        // { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      children: [
        { path: "", element: <Navigate to="users" /> },
        { path: "404", element: <h1>Not Found</h1> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
