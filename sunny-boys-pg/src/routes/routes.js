import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Signup from "../pages/account/UserDetails/signUp";
import RegistrationForm from "../pages/account/UserDetails/userDetails";
import Profile from "../pages/account/profile";
import Login from "../pages/account/login";
import Layout from "../layout";
import Logout from "../pages/account/logout";
import Dashboard from "../pages/admin/dashboard";
import Lobby from "../pages/admin/Lobby/lobby";
import TennantPayments from "../pages/admin/Payments/tennantPayments";
import ExpenseTracker from "../pages/admin/Expenses";
import Occupancy from "../pages/account/Occupancy";
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
        element: <Layout>
            <Signup />
        </Layout>
    },
    {
        path: '/register',
        element: <Layout>
            <RegistrationForm />
        </Layout>
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
    },
    {
        path: '/dashboard',
        element: <Layout>
            <Dashboard />
        </Layout>
    },
    {
        path: '/lobby',
        element: <Layout>
            <Lobby />
        </Layout>
    },
    {
        path: '/tennantPayments',
        element: <Layout>
            <TennantPayments/>
        </Layout>
    },
    {
        path: '/expenseTracker',
        element: <Layout>
            <ExpenseTracker/>
        </Layout>
    },
    {
        path: '/occupancy',
        element: <Layout>
            <Occupancy/>
        </Layout>
    },

    TennantPayments
]);
export default router;