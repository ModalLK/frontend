import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/format";
import { cancelOrder, getMyOrders } from "../services/orderService";

const badge = (status) => {
  if (status === "DELIVERED") return "bg-emerald-50 text-emerald-700";
  if (status === "SHIPPED") return "bg-blue-50 text-blue-700";
  if (status === "CONFIRMED") return "bg-amber-50 text-amber-700";
  if (status === "CANCELLED") return "bg-red-50 text-red-700";
  return "bg-slate-100 text-slate-700";
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    try {
      const updated = await cancelOrder(id);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      toast.success("Order cancelled");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-black text-slate-900">Orders</h1>
      <p className="mt-2 text-sm text-slate-500">
        Your order history and current statuses.
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No orders found.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="rounded-3xl border border-slate-200 p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-black text-slate-900">Order #{o.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{o.createdAt}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${badge(o.status)}`}
                >
                  {o.status}
                </span>

                <p className="text-sm font-black text-slate-900">
                  {formatCurrency(o.totalAmount)}
                </p>

                {(o.status === "PENDING" || o.status === "CONFIRMED") && (
                  <button
                    onClick={() => handleCancel(o.id)}
                    className="rounded-2xl border border-red-200 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {o.orderItems?.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>
                      {it.productName} × {it.quantity}
                    </span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(it.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
