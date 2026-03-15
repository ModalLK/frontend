import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { Heart, ShoppingBag, Menu, X, UserCircle } from "lucide-react";
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
  const { user, isAuthenticated, logout } = useAuth();
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

      <header className="sticky top-0 z-50 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/products" className={navClass}>Products</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/orders" className={navClass}>Orders</NavLink>
                
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wishlist */}
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

            {/* Cart */}
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

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="rounded-md bg-[#902bf5] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
                >
                  Sign In
                </Link>
              ) : (
                <>
                  {/* Profile Icon */}
                  <Link
                    to="/profile"
                    className="flex items-center justify-center rounded-full hover:opacity-80 transition"
                    title={`${user?.firstName} ${user?.lastName}`}
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-[#902bf5] flex items-center justify-center text-white text-sm font-black">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </div>
                    )}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-[#902bf5] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="p-2 text-slate-600 hover:text-[#902bf5] transition md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              <NavLink to="/" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/products" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                Products
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/orders" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                    Orders
                  </NavLink>
                  <NavLink to="/account" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                    Account
                  </NavLink>
                  <NavLink to="/profile" className={mobileNavClass} onClick={() => setMenuOpen(false)}>
                    Profile
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
