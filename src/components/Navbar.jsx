import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) =>
  `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-indigo-50 text-indigo-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-sm font-black text-white shadow-md">
            F.LK
          </div>
          <div className="leading-tight">
            <p className="text-base font-black tracking-tight text-slate-900">
              Fashion.LK
            </p>
            <p className="text-xs text-slate-500">Modern E-Commerce</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/orders" className={navClass}>
                Orders
              </NavLink>
              <NavLink to="/account" className={navClass}>
                Account
              </NavLink>
            </>
          )}
         
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/wishlist"
            className="relative rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Wishlist
            {wishCount > 0 && (
              <span className="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
                {wishCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Cart
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {cartCount}
            </span>
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="hidden rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="hidden rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
