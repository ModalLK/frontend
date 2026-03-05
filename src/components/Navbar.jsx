import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const navClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-slate-100 text-slate-900"
      : "text-slate-600 hover:bg-slate-50"
  }`;

export default function Navbar() {
  const { cartCount } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-600" />
          <div className="leading-tight">
            <p className="text-sm font-extrabold">ModalLK</p>
            <p className="text-xs text-slate-500">E-Commerce</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/orders" className={navClass}>
            Orders
          </NavLink>
          <NavLink to="/account" className={navClass}>
            Account
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/wishlist"
            className="relative rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            Wishlist
            {wishCount > 0 && (
              <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                {wishCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white hover:bg-blue-700"
          >
            Cart
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {cartCount}
            </span>
          </Link>

          <Link
            to="/login"
            className="hidden rounded-xl border px-3 py-2 text-sm hover:bg-slate-50 sm:inline-flex"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
