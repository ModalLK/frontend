import { formatCurrency } from "../utils/format";

export default function ProductCard({ product, onBuy }) {
  const stock = Number(product?.stock ?? 0);
  const outOfStock = stock <= 0;

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full bg-slate-100">
        <img
          src={product?.imageUrl}
          alt={product?.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/800x600?text=No+Image";
          }}
        />

        {/* Category badge */}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          {product?.category ?? "General"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-1 text-base font-bold text-slate-900">
              {product?.name}
            </h3>
            <p className="text-xs text-slate-500">SKU: {product?.sku}</p>
          </div>
          <p className="text-sm font-extrabold text-slate-900">
            {formatCurrency(product?.price)}
          </p>
        </div>

        {/* Stock */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <span
            className={
              outOfStock
                ? "rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                : "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
            }
          >
            {outOfStock ? "Out of stock" : `In stock: ${stock}`}
          </span>
        </div>

        {/* CTA */}
        <button
          disabled={outOfStock}
          onClick={() => onBuy?.(product)}
          className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
