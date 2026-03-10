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
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-black uppercase tracking-wide text-slate-900">
          Filters
        </p>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-700">
          Smart Search
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Search
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or SKU..."
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="POPULAR">Popular</option>
            <option value="PRICE_ASC">Price: Low → High</option>
            <option value="PRICE_DESC">Price: High → Low</option>
            <option value="NAME_ASC">Name: A → Z</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Price Range
          </label>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
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
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
