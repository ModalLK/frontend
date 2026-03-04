import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export default function Cart() {
  const nav = useNavigate();
  const {
    items,
    subtotal,
    shipping,
    total,
    freeShipThreshold,
    removeFromCart,
    setQty,
  } = useCart();

  const remaining = Math.max(0, freeShipThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8">
        <h2 className="text-xl font-extrabold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add some products to continue.
        </p>
        <Link
          to="/products"
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-2xl border bg-white">
        <div className="border-b p-4">
          <h2 className="text-xl font-extrabold">Cart</h2>
          <p className="mt-1 text-sm text-slate-500">
            {remaining === 0
              ? "🎉 You unlocked free shipping!"
              : `Add ${formatCurrency(remaining)} more for free shipping`}
          </p>
        </div>

        <div className="divide-y">
          {items.map((x) => (
            <div key={x.id} className="flex gap-4 p-4">
              <img
                src={x.imageUrl}
                alt={x.name}
                className="h-20 w-20 rounded-xl bg-slate-100 object-contain p-2"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/300?text=No+Image")
                }
              />

              <div className="flex-1">
                <p className="font-extrabold">{x.name}</p>
                <p className="text-xs text-slate-500">SKU: {x.sku}</p>
                <p className="mt-1 text-sm font-extrabold">
                  {formatCurrency(x.price)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <select
                  value={x.qty}
                  onChange={(e) => setQty(x.id, Number(e.target.value))}
                  className="rounded-xl border bg-white px-3 py-2 text-sm"
                >
                  {Array.from({
                    length: Math.min(10, Math.max(1, x.stock || 10)),
                  }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => removeFromCart(x.id)}
                  className="text-sm font-bold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4">
        <h3 className="text-lg font-extrabold">Order Summary</h3>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-bold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Shipping</span>
            <span className="font-bold">
              {shipping === 0 ? "FREE" : formatCurrency(shipping)}
            </span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-3">
            <span className="font-extrabold">Total</span>
            <span className="font-extrabold">{formatCurrency(total)}</span>
          </div>
        </div>

        <button
          onClick={() => nav("/checkout")}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-blue-700"
        >
          Checkout
        </button>

        <Link
          to="/products"
          className="mt-3 inline-flex w-full justify-center rounded-xl border px-4 py-2 text-sm font-bold hover:bg-slate-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
