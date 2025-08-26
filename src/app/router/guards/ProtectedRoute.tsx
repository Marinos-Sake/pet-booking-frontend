import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/UseAuth.tsx";
import FullPageLoader from "../../components/FullPageLoader.tsx";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FullPageLoader message="Έλεγχος σύνδεσης..." />;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
}
