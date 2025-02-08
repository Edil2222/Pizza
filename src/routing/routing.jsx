import {createBrowserRouter} from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'login',
        element: <Login />
    }
])

export default router