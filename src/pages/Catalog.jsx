import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";

export default function Catalog({ onBuy }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("ALL");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError(
          "Failed to load products. Check Product Service + CORS + URL.",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory = category === "ALL" || p.category === category;
      const matchText =
        !text ||
        (p.name || "").toLowerCase().includes(text) ||
        (p.sku || "").toLowerCase().includes(text);
      return matchCategory && matchText;
    });
  }, [products, category, q]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Product Catalog
          </h1>
          <p className="text-sm text-slate-500">
            Browse items and purchase via Payment Service.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600">
          Loading products...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600">
          No products found.
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onBuy={onBuy} />
          ))}
        </div>
      )}
    </div>
  );
}
