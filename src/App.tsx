import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import MyProfile from "./pages/MyProfile.tsx";


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
            </Routes>
        </>
    );
}
export default App;