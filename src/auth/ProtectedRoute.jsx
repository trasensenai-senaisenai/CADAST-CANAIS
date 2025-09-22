import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { isAuth } = useAuth();
  // se não estiver logado, volta para /
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
