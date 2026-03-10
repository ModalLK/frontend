import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { items: wish, toggleWishlist } = useWishlist();

  const stock = Number(product?.stock ?? 0);
  const outOfStock = stock <= 0;
  const wished = wish.some((x) => x.id === product?.id);

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product?.id}`} className="block">
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/800x600?text=No+Image")
            }
          />
          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-indigo-700 shadow-sm">
            {product?.category ?? "General"}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-extrabold text-slate-900">
              {product?.name}
            </p>
            <p className="mt-1 text-xs text-slate-500">SKU: {product?.sku}</p>
          </div>
          <p className="text-base font-black text-slate-900">
            {formatCurrency(product?.price)}
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={
              outOfStock
                ? "rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
                : "rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
            }
          >
            {outOfStock ? "Out of stock" : `In stock: ${stock}`}
          </span>

          <button
            onClick={() => toggleWishlist(product)}
            className={`rounded-2xl border px-3 py-2 text-xs font-bold transition ${
              wished
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {wished ? "Saved" : "Wishlist"}
          </button>
        </div>

        <button
          disabled={outOfStock}
          onClick={() => addToCart(product, 1)}
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
