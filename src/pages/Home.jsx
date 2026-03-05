import { Link } from "react-router-dom";

export default function Home() {
  const categories = [
    "Fashion",
    "Makeup",
    "Electronics",
    "Home",
    "Sports",
    "Accessories",
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border bg-white p-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600">
              Microservices Store
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              Shop smarter with Product + Payment services
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Clean UI, fast catalog, cart + checkout flow, and order history.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                to="/products"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-blue-700"
              >
                Browse Products
              </Link>
              <Link
                to="/wishlist"
                className="rounded-xl border px-4 py-2.5 text-sm font-extrabold hover:bg-slate-50"
              >
                Wishlist
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-100 p-8">
            <div className="h-52 rounded-2xl bg-gradient-to-br from-blue-200 to-slate-200" />
            <p className="mt-4 text-xs text-slate-500">
              Hero banner placeholder
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { k: "2 Services", v: "Product + Payment" },
          { k: "Fast UI", v: "Search / Filter / Sort" },
          { k: "Secure Flow", v: "Checkout → Success" },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border bg-white p-5">
            <p className="text-xl font-extrabold">{x.k}</p>
            <p className="mt-1 text-sm text-slate-600">{x.v}</p>
          </div>
        ))}
      </section>

      {/* Category grid */}
      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-extrabold">Shop by Category</h2>
          <Link
            to="/products"
            className="text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c}
              to="/products"
              className="rounded-2xl border bg-white p-4 text-center text-sm font-extrabold hover:bg-slate-50"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products placeholder */}
      <section className="rounded-3xl border bg-white p-6">
        <h2 className="text-lg font-extrabold">Featured Products</h2>
        <p className="mt-1 text-sm text-slate-600">
          You can load 4 products from API here later.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-slate-50 p-5">
              <div className="h-24 rounded-xl bg-slate-200" />
              <p className="mt-3 text-sm font-extrabold">Featured Item</p>
              <p className="text-xs text-slate-500">Placeholder</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features strip */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { t: "Free shipping goal", d: "Incentive on cart page" },
          { t: "Wishlist", d: "Save products and add later" },
          { t: "Order history", d: "Track + invoice buttons" },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border bg-white p-5">
            <p className="font-extrabold">{x.t}</p>
            <p className="mt-1 text-sm text-slate-600">{x.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
