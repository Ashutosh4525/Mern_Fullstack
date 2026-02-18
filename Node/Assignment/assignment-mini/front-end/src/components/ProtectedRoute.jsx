import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user,loading } = useAuth();

  if (loading) {
    return <div>Loading Authentication...</div>; 
  }
    if (!user) {
    return <Navigate to="/login" replace />;
   }

    const isAdmin = Array.isArray(user.role) 
    ? user.role.includes("admin") 
    : user.role === "admin";
     if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;