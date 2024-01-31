import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Signup from "../pages/account/UserDetails/signUp";
import RegistrationForm from "../pages/account/UserDetails/userDetails";
import Profile from "../pages/account/profile";
import Login from "../pages/account/login";
import Layout from "../layout";
import Logout from "../pages/account/logout";
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
        element: <Layout>
            <Login />
        </Layout>
    },
    {
        path: '/logout',
        element: <Logout />
    }
]);
export default router;