import { useRoutes, Navigate } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import AdminRoute from "./guards/AdminRoute";
import AdminLayout from "../../features/admin/components/AdminLayout";

// pages
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Booking from "../../pages/Booking";
import MyProfile from "../../pages/MyProfile";
import ProfileEdit from "../../pages/ProfileEdit";
import DogsHotel from "../../pages/DogsHotel";
import CatHotel from "../../pages/CatHotel";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import NotFound from "../../pages/NotFound";

import AdminRooms from "../../pages/Admin/AdminRooms.tsx";
import AdminBookings from "../../pages/Admin/AdminBookings.tsx";
import AdminPayments from "../../pages/Admin/AdminPayments.tsx";
import AdminUsers from "../../pages/Admin/AdminUsers.tsx";


export function AppRoutes() {
    const element = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },

        // Public
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/dogs-hotel", element: <DogsHotel /> },
        { path: "/cats-hotel", element: <CatHotel /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },

        // Protected
        { path: "/me", element: <ProtectedRoute><MyProfile /></ProtectedRoute> },
        { path: "/booking", element: <ProtectedRoute><Booking /></ProtectedRoute> },
        { path: "/edit", element: <ProtectedRoute><ProfileEdit /></ProtectedRoute> },

        // Admin (nested)
        {
            path: "/admin",
            element: <AdminRoute><AdminLayout /></AdminRoute>,
            children: [
                { index: true, element: <Navigate to="rooms" replace /> },
                { path: "rooms",     element: <AdminRooms /> },
                { path: "bookings",  element: <AdminBookings /> },
                { path: "payments",  element: <AdminPayments /> },
                { path: "users",     element: <AdminUsers /> },
            ],
        },


        { path: "*", element: <NotFound/>}
    ]);

    return element;
}
