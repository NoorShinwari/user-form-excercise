import { Navigate, useRoutes } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import Page404 from "./pages/Page404";
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
      ],
    },
    {
      path: "/",
      children: [
        { path: "", element: <Navigate to="users" /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
