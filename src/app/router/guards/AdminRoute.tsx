import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/UseAuth.tsx";
import FullPageLoader from "../../components/FullPageLoader.tsx";


export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FullPageLoader message="Φόρτωση δικαιωμάτων..." />;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    if (profile?.role !== "ADMIN") {
        return <Navigate to="/forbidden" replace />;
    }
    return <>{children}</>;
}
