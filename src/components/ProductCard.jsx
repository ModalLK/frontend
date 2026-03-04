import { formatCurrency } from "../utils/format";

export default function ProductCard({ product, onBuy }) {
  const stock = Number(product?.stock ?? 0);
  const outOfStock = stock <= 0;

  return (
    <div className="card">
      <img
        src={product?.imageUrl}
        alt={product?.name}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />

      <div className="row">
        <strong>{product?.name}</strong>
        <span className="badge">{product?.category ?? "General"}</span>
      </div>

      <div className="row">
        <span>{formatCurrency(product?.price)}</span>
        <span className={outOfStock ? "stock-no" : "stock-ok"}>
          Stock: {stock}
        </span>
      </div>

      <button
        className="btn btn-primary"
        disabled={outOfStock}
        onClick={() => onBuy?.(product)}
      >
        Buy Now
      </button>
    </div>
  );
}
