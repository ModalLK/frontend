import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";
import CatalogSidebar from "../components/products/CatalogSidebar";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "ALL",
  );
  const [sort, setSort] = useState("POPULAR");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load products");
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
    const minP = Math.min(priceRange[0], priceRange[1]);
    const maxP = Math.max(priceRange[0], priceRange[1]);

    let list = products.filter((p) => {
      const matchCategory = category === "ALL" || p.category === category;
      const price = Number(p.price || 0);
      const matchPrice = price >= minP && price <= maxP;
      const matchText =
        !text ||
        (p.name || "").toLowerCase().includes(text) ||
        (p.sku || "").toLowerCase().includes(text);

      return matchCategory && matchText && matchPrice;
    });

    if (sort === "PRICE_ASC") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "PRICE_DESC") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "NAME_ASC") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return list;
  }, [products, q, category, sort, priceRange]);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <CatalogSidebar
          q={q}
          setQ={setQ}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
        />
      </div>

      {/* Product Grid */}
      <div className="lg:col-span-3">
        {loading && (
          <div className="rounded-3xl border border-[#f3e8ff] bg-[#f3e8ff] p-6 text-sm font-semibold text-[#902bf5] shadow-sm">
            Loading products...
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
            No products found.
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
