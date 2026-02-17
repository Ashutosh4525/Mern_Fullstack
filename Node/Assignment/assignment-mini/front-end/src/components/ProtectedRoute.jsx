import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user } = useAuth();

    if (!user) {
    return <Navigate to="/login" replace />;
   }

    const isAdmin = user.role?.includes("admin");
     if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />; // Redirect non-admins to home
  }

  return <Outlet />;
};

export default ProtectedRoute;