import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getAllProducts,
  getProductById,
  checkStock,
} from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatCurrency } from "../utils/format";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { items: wish, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const wished = wish.some((x) => x.id === Number(id) || x.id === id);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const p = await getProductById(id);
        setProduct(p);

        const all = await getAllProducts();
        const list = Array.isArray(all) ? all : [];
        setRelated(
          list
            .filter(
              (x) => x.id !== p.id && x.category && x.category === p.category,
            )
            .slice(0, 4),
        );
      } catch (e) {
        setError(e.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const stock = Number(product?.stock ?? 0);
  const maxQty = Math.max(1, Math.min(10, stock || 10));

  async function handleAddToCart() {
    try {
      const result = await checkStock(product.id, qty);

      if (!result.available) {
        toast.error(`Only ${result.availableStock} item(s) available`);
        return;
      }

      addToCart(product, qty);
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to check stock");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
        {error}
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-[2rem] bg-slate-50 p-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-80 w-full object-contain"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/800x600?text=No+Image")
              }
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {product.category ?? "General"}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">SKU: {product.sku}</p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-3xl font-black text-slate-900">
              {formatCurrency(product.price)}
            </p>
            <span
              className={
                stock <= 0
                  ? "rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700"
                  : "rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700"
              }
            >
              {stock <= 0 ? "Out of stock" : `In stock: ${stock}`}
            </span>
          </div>

          <div className="mt-4 text-sm text-amber-500">
            ★★★★☆ <span className="ml-1 text-slate-400">(120 reviews)</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-bold text-slate-700">Quantity</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              disabled={stock <= 0}
            >
              {Array.from({ length: maxQty }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              disabled={stock <= 0}
              onClick={handleAddToCart}
              className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:bg-slate-300"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                wished
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {wished ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-black text-slate-900">Description</p>
            <p className="mt-2 leading-7">
              {product.description ||
                "No description available for this product yet."}
            </p>
          </div>

          <Link
            to="/products"
            className="mt-5 inline-flex text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Related Products
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
