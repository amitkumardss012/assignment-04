import "./index.css";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AuthGuard, GuestGuard } from "./components/AuthGuard";
import { AdminGuard } from "./components/AdminGuard";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { ProfilePage } from "./pages/Profile";
import { DashboardPage } from "./pages/Dashboard";
import { InquiriesPage } from "./pages/Inquiries";
import { AdminDashboardPage } from "./pages/admin/AdminDashboard";
import { AdminVendorsPage } from "./pages/admin/AdminVendors";
import { AdminVendorDetailsPage } from "./pages/admin/AdminVendorDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/", element: <Navigate to="/login" replace /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/inquiries", element: <InquiriesPage /> },
        ],
      },
    ],
  },
  {
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <Navigate to="/admin/dashboard" replace /> },
          { path: "/admin/dashboard", element: <AdminDashboardPage /> },
          { path: "/admin/vendors", element: <AdminVendorsPage /> },
          { path: "/admin/vendors/:id", element: <AdminVendorDetailsPage /> },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
