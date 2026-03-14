import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { label: "Users", path: "/admin/users", icon: <Users size={18} /> },
  { label: "Products", path: "/admin/products", icon: <Package size={18} /> },
  { label: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white text-[#1a1a2e] flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-6 flex flex-col items-center gap-3">
        <img
          src="/images/logo.png"
          alt="ModelLK"
          className="h-16 w-auto object-contain"
        />
        <h1 className="text-2xl font-bold">Welcome</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive ? " text-[#902bf5]" : "text-[#1a1a2e] "
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#1a1a2e] w-full transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
