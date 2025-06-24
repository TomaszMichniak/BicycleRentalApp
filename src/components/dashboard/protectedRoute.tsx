import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};
