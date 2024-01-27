import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Signup from "../pages/account/signUp";
import RegistrationForm from "../pages/account/userDetails";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path:'/signUp',
        element:<RegistrationForm/>
    }
]);
export default router;