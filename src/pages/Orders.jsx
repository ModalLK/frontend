import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/format";
import { cancelOrder, getMyOrders } from "../services/orderService";

const statusBadge = (status) => {
  if (status === "DELIVERED") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (status === "SHIPPED")   return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  if (status === "CONFIRMED") return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  if (status === "CANCELLED") return "bg-red-50 text-red-700 ring-1 ring-red-200";
  return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
};

const statusDot = (status) => {
  if (status === "DELIVERED") return "bg-emerald-500";
  if (status === "SHIPPED")   return "bg-blue-500";
  if (status === "CONFIRMED") return "bg-amber-500";
  if (status === "CANCELLED") return "bg-red-500";
  return "bg-slate-400";
};

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

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

  useEffect(() => { loadOrders(); }, []);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Your order history and current statuses.</p>
        </div>
        {!loading && orders.length > 0 && (
          <span className="rounded-full bg-[#f3e8ff] px-3 py-1 text-xs font-bold text-[#902bf5]">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* States */}
      {loading ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-slate-400">
          <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-sm">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-3-3v6M3 12a9 9 0 1118 0A9 9 0 013 12z"/>
            </svg>
          </div>
          <p className="font-semibold text-slate-700">No orders yet</p>
          <p className="text-sm text-slate-400">Your orders will appear here once you place one.</p>
        </div>
      ) : (

        /* Table */
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">

            {/* Table head */}
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <>
                  {/* Main row */}
                  <tr
                    key={o.id}
                    onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    className="cursor-pointer transition hover:bg-slate-50"
                  >
                    {/* Order ID */}
                    <td className="px-5 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <svg
                          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${expanded === o.id ? "rotate-90" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                        #{o.id}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-slate-500">
                      {new Date(o.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </td>

                    {/* Items count */}
                    <td className="px-5 py-4 text-slate-500">
                      {o.orderItems?.length ?? 0} item{o.orderItems?.length !== 1 ? "s" : ""}
                    </td>

                    {/* Total */}
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {formatCurrency(o.totalAmount)}
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadge(o.status)}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot(o.status)}`}/>
                        {o.status}
                      </span>
                    </td>

                    {/* Cancel action */}
                    <td className="px-5 py-4 text-right">
                      {(o.status === "PENDING" || o.status === "CONFIRMED") ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCancel(o.id); }}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>

                  {/* Expandable items row */}
                  {expanded === o.id && (
                    <tr key={`${o.id}-items`} className="bg-[#faf8ff]">
                      <td colSpan={6} className="px-10 py-4">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                          Order Items
                        </p>
                        <div className="space-y-2">
                          {o.orderItems?.map((it) => (
                            <div
                              key={it.id}
                              className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3e8ff] text-xs font-bold text-[#902bf5]">
                                  ×{it.quantity}
                                </div>
                                <span className="font-medium text-slate-800">{it.productName}</span>
                              </div>
                              <span className="font-bold text-slate-900">{formatCurrency(it.subtotal)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}