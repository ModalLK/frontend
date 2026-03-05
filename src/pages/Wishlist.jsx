import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8">
        <h2 className="text-xl font-extrabold">Wishlist is empty</h2>
        <p className="mt-2 text-sm text-slate-600">
          Save products to wishlist from Catalog or Product page.
        </p>
        <Link
          to="/products"
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h1 className="text-xl font-extrabold">Wishlist</h1>

      <div className="mt-5 divide-y">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="h-16 w-16 rounded-xl bg-slate-100 object-contain p-2"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/300?text=No+Image")
              }
            />
            <div className="flex-1">
              <p className="font-extrabold">{p.name}</p>
              <p className="text-xs text-slate-500">SKU: {p.sku}</p>
              <p className="text-sm font-extrabold">
                {formatCurrency(p.price)}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addToCart(p, 1)}
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-extrabold text-white hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(p)}
                className="rounded-xl border px-3 py-2 text-sm font-extrabold hover:bg-slate-50"
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
