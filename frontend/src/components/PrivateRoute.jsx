import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

// Autorização no frontend: rotas internas exigem usuário autenticado.
export function PrivateRoute() {
  const { isAuthenticated, checking } = useAuth();
  const location = useLocation();

  if (checking) return <Loading label="Verificando sessão..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}

// Login e cadastro não fazem sentido para quem já entrou.
export function PublicOnlyRoute() {
  const { isAuthenticated, checking } = useAuth();

  if (checking) return <Loading label="Verificando sessão..." />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
