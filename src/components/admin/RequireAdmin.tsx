import { Navigate } from "react-router-dom";
import { getToken } from "../../api/api";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const token = getToken();
  if (!token) return <Navigate to="/epc-admin-92f3/login" replace />;
  return <>{children}</>;
}
