import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/format";
import { getMockOrders } from "../services/orderService";

const badge = (status) => {
  if (status === "DELIVERED") return "bg-emerald-50 text-emerald-700";
  if (status === "PROCESSING") return "bg-amber-50 text-amber-700";
  if (status === "CANCELLED") return "bg-red-50 text-red-700";
  return "bg-slate-100 text-slate-700";
};

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // replace with getMyOrders() later
    setOrders(getMockOrders());
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h1 className="text-xl font-extrabold">Orders</h1>
      <p className="mt-1 text-sm text-slate-500">
        Order history with status and actions.
      </p>

      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-extrabold">{o.id}</p>
                <p className="text-xs text-slate-500">{o.date}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-extrabold ${badge(o.status)}`}
              >
                {o.status}
              </span>

              <p className="text-sm font-extrabold">
                {formatCurrency(o.total)}
              </p>

              <div className="flex gap-2">
                <button className="rounded-xl border px-3 py-2 text-sm font-bold hover:bg-slate-50">
                  Track
                </button>
                <button className="rounded-xl border px-3 py-2 text-sm font-bold hover:bg-slate-50">
                  Invoice
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-600">
              {o.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {it.name} × {it.qty}
                  </span>
                  <span className="font-bold">
                    {formatCurrency(it.price * it.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
