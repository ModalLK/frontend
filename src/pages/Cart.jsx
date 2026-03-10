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
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">
          Your cart is empty
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add products to your cart and continue shopping.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-2xl font-black text-slate-900">Shopping Cart</h2>
          <p className="mt-2 text-sm text-slate-500">
            {remaining === 0
              ? "🎉 You unlocked free shipping!"
              : `Add ${formatCurrency(remaining)} more for free shipping`}
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {items.map((x) => (
            <div key={x.id} className="flex gap-4 p-5">
              <img
                src={x.imageUrl}
                alt={x.name}
                className="h-24 w-24 rounded-2xl bg-slate-100 object-contain p-2"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/300?text=No+Image")
                }
              />

              <div className="flex-1">
                <p className="font-black text-slate-900">{x.name}</p>
                <p className="mt-1 text-xs text-slate-500">SKU: {x.sku}</p>
                <p className="mt-2 text-sm font-black text-slate-900">
                  {formatCurrency(x.price)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <select
                  value={x.qty}
                  onChange={(e) => setQty(x.id, Number(e.target.value))}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-black text-slate-900">Order Summary</h3>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-bold text-slate-900">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-600">Shipping</span>
            <span className="font-bold text-slate-900">
              {shipping === 0 ? "FREE" : formatCurrency(shipping)}
            </span>
          </div>

          <div className="flex justify-between border-t border-slate-200 pt-4">
            <span className="font-black text-slate-900">Total</span>
            <span className="font-black text-slate-900">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <button
          onClick={() => nav("/checkout")}
          className="mt-5 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Checkout
        </button>

        <Link
          to="/products"
          className="mt-3 inline-flex w-full justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
