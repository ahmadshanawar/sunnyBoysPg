import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Signup from "../pages/account/signUp";
import RegistrationForm from "../pages/account/userDetails";
import Profile from "../pages/account/profile";
import Login from "../pages/account/login";
import Layout from "../layout";
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
        path: '/signUp',
        element: <Signup />
    },
    {
        path: '/register',
        element: <RegistrationForm />
    },
    {
        path: '/profile',
        element: <Layout>
            <Profile />
        </Layout>
    },
    {
        path: '/login',
        element: <Login />
    }
]);
export default router;