import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import CartSidebar from "../CartSidebar";

const navClass = ({ isActive }) =>
  `px-4 py-2 text-sm font-semibold transition rounded-xl ${
    isActive ? "text-[#902bf5]" : "text-slate-600 hover:text-[#902bf5]"
  }`;

const mobileNavClass = ({ isActive }) =>
  `block w-full px-4 py-3 text-sm font-semibold transition rounded-xl ${
    isActive ? "text-[#902bf5]" : "text-slate-600 hover:text-[#902bf5]"
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
    setMenuOpen(false);
  }

  return (
    <>
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
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

          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 hover:text-[#902bf5] transition"
            >
              <Heart className="h-6 w-6" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#902bf5] text-[10px] font-bold text-white">
                  {wishCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-[#902bf5] transition"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#902bf5] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="rounded-xl bg-[#902bf5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-[#902bf5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
                >
                  Logout
                </button>
              )}
            </div>

            <button
              className="p-2 text-slate-600 hover:text-[#902bf5] transition md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                className={mobileNavClass}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={mobileNavClass}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/orders"
                    className={mobileNavClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/account"
                    className={mobileNavClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    Account
                  </NavLink>
                </>
              )}
              <div className="mt-2 border-t border-slate-100 pt-2">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full rounded-md bg-[#902bf5] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
                  >
                    Sign In
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-md bg-[#902bf5] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
