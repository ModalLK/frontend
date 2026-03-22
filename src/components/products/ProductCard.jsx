import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { items: wish, toggleWishlist } = useWishlist();

  const stock = Number(product?.stock ?? 0);
  const outOfStock = stock <= 0;
  const wished = wish.some((x) => x.id === product?.id);

  async function handleAddToCart() {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await addToCart(product, 1, "M");
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    }
  }

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product?.id}`} className="block">
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/800x600?text=No+Image")
            }
          />
          <div className="absolute left-3 top-3 rounded-full bg-[#902bf5] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {product?.category ?? "General"}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute right-3 top-3 rounded-full bg-white p-1.5 shadow-sm transition hover:scale-110"
          >
            <Heart
              className={`h-4 w-4 transition ${
                wished ? "fill-[f3e8ff] text-[#902bf5]" : "text-slate-400"
              }`}
            />
          </button>
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

        <div className="mb-4">
          <span
            className={
              outOfStock
                ? "rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
                : "rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
            }
          >
            {outOfStock ? "Out of stock" : `In stock: ${stock}`}
          </span>
        </div>

        <button
          disabled={outOfStock}
          onClick={handleAddToCart}
          className="w-full rounded-2xl bg-[#902bf5] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
