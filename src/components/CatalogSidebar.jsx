import PriceRange from "./PriceRange";

export default function CatalogSidebar({
  q,
  setQ,
  category,
  setCategory,
  sort,
  setSort,
  priceRange,
  setPriceRange,
  categories,
}) {
  return (
    <aside className="rounded-2xl border bg-white p-4">
      <p className="text-sm font-extrabold">Filters</p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-600">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name or SKU..."
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="POPULAR">Popular</option>
            <option value="PRICE_ASC">Price: Low → High</option>
            <option value="PRICE_DESC">Price: High → Low</option>
            <option value="NAME_ASC">Name: A → Z</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">
            Price Range
          </label>
          <div className="mt-2">
            <PriceRange value={priceRange} onChange={setPriceRange} />
          </div>
        </div>

        <button
          onClick={() => {
            setQ("");
            setCategory("ALL");
            setSort("POPULAR");
            setPriceRange([0, 50000]);
          }}
          className="w-full rounded-xl border px-3 py-2 text-sm font-bold hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
