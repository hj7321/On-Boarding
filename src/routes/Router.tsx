import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import SignUpPage from "../pages/SignUpPage";
import Layout from "../shared/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/my",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
