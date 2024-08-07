import Navbar from "./components/custom/Navbar";
import CreateEventForm from "./pages/CreateEventForm";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import About from "@/pages/About.tsx";
import DetailPage from "@/pages/DetailPage.tsx";
import EditEvent from "@/pages/EditEvent.tsx";
import Landing from "@/pages/Landing.tsx";
import Profile from "@/pages/Profile.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/event/create",
        element: <CreateEventForm />,
      },
      {
        path: "/event/:id",
        element: <DetailPage />,
      },
      {
        path: "/signup",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/editevent/:eventId",
        element: <EditEvent />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
