import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold text-indigo-600">ModalLK</h3>
            <p className="mt-3 text-sm text-slate-600">
              Modern e-commerce platform built with microservices architecture.
              Shop smarter with a fast, clean, and reliable experience.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Shop
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/products" className="hover:text-indigo-600">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="hover:text-indigo-600">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-indigo-600">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-indigo-600">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Categories
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Fashion</li>
              <li>Makeup</li>
              <li>Electronics</li>
              <li>Home</li>
              <li>Sports</li>
              <li>Accessories</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-800">
              Contact
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Email: support@modallk.com</li>
              <li>Phone: +94 71 123 4567</li>
              <li>Location: Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ModalLK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
