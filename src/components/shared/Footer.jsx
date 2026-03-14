import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src="/images/footerlogo.png"
              alt="Logo"
              className="h-14 w-auto object-contain"
            />
            <p className="mt-3 text-md text-white">
              Modern e-commerce platform built with microservices architecture.
              Shop smarter with a fast, clean, and reliable experience.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-[#902bf5] transition"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-[#902bf5] transition"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-[#902bf5] transition"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="text-white hover:text-[#902bf5] transition"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/products"
                  className="hover:underline transition"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:underline transition"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:underline transition">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">
              Categories
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
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
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Email: support@modallk.com</li>
              <li>Phone: +94 71 123 4567</li>
              <li>Location: Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ModalLK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
