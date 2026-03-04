import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold">ModalLK</p>
          <p className="mt-2 text-sm text-slate-400">
            Microservices E-Commerce frontend (Product + Payment + Orders).
          </p>
        </div>

        <div>
          <p className="text-sm font-bold">Shop</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/products" className="hover:text-white">
              Products
            </Link>
            <Link to="/wishlist" className="hover:text-white">
              Wishlist
            </Link>
            <Link to="/cart" className="hover:text-white">
              Cart
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Account</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
            <Link to="/register" className="hover:text-white">
              Register
            </Link>
            <Link to="/orders" className="hover:text-white">
              Orders
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Support</p>
          <p className="mt-3 text-sm text-slate-400">
            support@modallk.com <br /> Sri Lanka
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-slate-400">
          © {new Date().getFullYear()} ModalLK
        </div>
      </div>
    </footer>
  );
}
