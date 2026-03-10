import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">
          Wishlist is empty
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Save products to your wishlist from the catalog or product page.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-black text-slate-900">Wishlist</h1>

      <div className="mt-6 divide-y divide-slate-200">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="h-20 w-20 rounded-2xl bg-slate-100 object-contain p-2"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/300?text=No+Image")
              }
            />

            <div className="flex-1">
              <p className="font-black text-slate-900">{p.name}</p>
              <p className="mt-1 text-xs text-slate-500">SKU: {p.sku}</p>
              <p className="mt-2 text-sm font-black text-slate-900">
                {formatCurrency(p.price)}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addToCart(p, 1)}
                className="rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(p)}
                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
