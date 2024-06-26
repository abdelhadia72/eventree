import Home from './pages/Home'
import Navbar from './components/custom/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateEventForm from './pages/CreateEventForm'

import {
    createBrowserRouter, Outlet,
    RouterProvider
} from "react-router-dom";
import DetailPage from "@/pages/DetailPage.tsx";
import About from "@/pages/About.tsx";


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
                path: "/",
                element:<Home/>
            },
            {
                path: "/login",
                element: <Login/>,
            },            {
                path: "/signup",
                element: <Signup />,
            },{
                path: "/event/create",
                element: <CreateEventForm />,
            }, {
                path: "/event/:id",
                element: <DetailPage />,
            },{
                path: "/signup",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />
            }
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
