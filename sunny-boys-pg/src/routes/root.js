import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/home/home";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);
export default router;