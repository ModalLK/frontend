import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProducts, getProductById } from "../services/productService";
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

  if (loading)
    return <div className="rounded-2xl border bg-white p-6">Loading...</div>;
  if (error)
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  if (!product) return null;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
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

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-xs font-bold text-slate-500">
            {product.category ?? "General"}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold">{product.name}</h1>
          <p className="mt-1 text-sm text-slate-500">SKU: {product.sku}</p>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-2xl font-extrabold">
              {formatCurrency(product.price)}
            </p>
            <span
              className={
                stock <= 0
                  ? "text-sm font-bold text-red-600"
                  : "text-sm font-bold text-emerald-700"
              }
            >
              {stock <= 0 ? "Out of stock" : `In stock: ${stock}`}
            </span>
          </div>

          {/* rating (static demo) */}
          <div className="mt-3 text-sm text-slate-600">
            ⭐ 4.6 <span className="text-slate-400">(120 reviews)</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <label className="text-sm font-bold">Qty</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="rounded-xl border bg-white px-3 py-2 text-sm"
              disabled={stock <= 0}
            >
              {Array.from({ length: maxQty }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              disabled={stock <= 0}
              onClick={() => addToCart(product, qty)}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-700 disabled:bg-slate-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`rounded-xl border px-4 py-3 text-sm font-extrabold ${
                wished ? "bg-slate-900 text-white" : "hover:bg-slate-50"
              }`}
            >
              {wished ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-bold text-slate-900">Description</p>
            <p className="mt-2">
              Add your real description field later. For now this is a clean
              product detail layout.
            </p>
          </div>

          <Link
            to="/products"
            className="mt-4 inline-flex text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-extrabold">Related Products</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
