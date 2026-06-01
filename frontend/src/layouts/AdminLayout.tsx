import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useUser, useLogout } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { LayoutDashboard, Users, LogOut, Menu, X, ShieldAlert } from "lucide-react";

export function AdminLayout() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login")
    });
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Vendors", path: "/admin/vendors", icon: Users },
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
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
                  className={`w-full justify-start gap-3 ${isActive ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-950">
          <div className="px-4 mb-4 text-sm text-slate-400 font-medium truncate">
            {user?.email}
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-400/10" 
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
            <h1 className="text-xl font-bold text-neutral-900">Admin Portal</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
