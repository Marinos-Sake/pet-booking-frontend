import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import DogsHotel from "./pages/DogsHotel.tsx";
import CatHotel from "./pages/CatHotel";


function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/me" element={<MyProfile/>} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/dogs-hotel" element={<DogsHotel />} />
                <Route path="/cats-lodge" element={<CatHotel />} />
            </Routes>
        </>
    );
}
export default App;