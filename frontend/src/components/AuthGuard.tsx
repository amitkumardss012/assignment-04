import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

export function AuthGuard() {
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

  if (user.role === "ADMIN") {
    // Admins shouldn't be trapped in the vendor layout
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

export function GuestGuard() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (user) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
