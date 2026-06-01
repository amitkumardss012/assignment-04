import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

export function AdminGuard() {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "ADMIN") {
    // If a normal vendor tries to access admin routes, kick them to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
