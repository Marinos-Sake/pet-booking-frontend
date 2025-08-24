import Navbar from "./app/components/Navbar";
import { AppRoutes } from "./app/router/Routes.tsx";

export default function App() {
    return (
        <>
            <Navbar />
            <AppRoutes />
        </>
    );
}
