import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import CraftAddForm from "./components/ui/CraftAddForm";
import CraftPage from "./components/pages/CraftPage";
import CraftOneCard from "./components/ui/CraftOneCard";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ProtectedRouter from "./HOCs/ProtectedRouter";
import useUser from "./hooks/useUser";

function App() {
  const { user, loginHandler, logoutHandler, signUpHandler } = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout logoutHandler={logoutHandler} user={user} />,
      errorElement: <h1>No content</h1>,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRouter
              isAllowed={user.status === "logged" && user.data.name === "Bob"}
              redirectTo={"/craft"}
            >
              {" "}
              <MainPage />
            </ProtectedRouter>
          ),
        },
        {
          element: (
            <ProtectedRouter
              isAllowed={user.status === "logged"}
              redirectTo={"/login"}
            />
          ),
          children: [
            {
              path: "/craft",
              element: <CraftPage user={user} />,
            },
            {
              path: "/newcraft",
              element: <CraftAddForm />,
            },
          ],
        },

        {
          element: (
            <ProtectedRouter
              isAllowed={user.status !== "logged"}
              redirectTo={"/craft"}
            />
          ),
          children: [
            {
              path: "/signup",
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: "/login",
              element: <LoginPage loginHandler={loginHandler} />,
            },
          ],
        },

        {
          path: "/onecraft/:craftId",
          element: <CraftOneCard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
