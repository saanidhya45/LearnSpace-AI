import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import HomePage from "./features/rooms/pages/HomePage";
import Protected from "./features/auth/components/protected";
import Rooms from "./features/rooms/pages/Rooms";

export const Router = createBrowserRouter([
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    {
        path : "/",
        element : <Protected><HomePage/></Protected>
    },
    {
        path : "/Rooms/:RoomID/",
        element : <Protected><Rooms/></Protected>
    }
])