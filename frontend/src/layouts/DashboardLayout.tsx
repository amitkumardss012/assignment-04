import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useUser, useLogout } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { LayoutDashboard, User, Inbox, LogOut, Menu, X } from "lucide-react";

export function DashboardLayout() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login")
    });
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Inquiries", path: "/inquiries", icon: Inbox },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="h-screen bg-neutral-50 flex overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-900">StarVnt</h1>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-3"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-neutral-200 shrink-0">
          <div className="px-4 mb-4 text-sm text-neutral-500 font-medium truncate">
            {user?.email}
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 bg-white md:hidden shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-neutral-900">StarVnt</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
