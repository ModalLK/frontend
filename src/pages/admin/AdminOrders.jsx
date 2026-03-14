import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_ORDER_API_URL}/admin/orders`,
        { headers }
      );
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_ORDER_API_URL}/admin/orders/${orderId}/status?status=${newStatus}`,
        {},
        { headers }
      );
      toast.success("Order status updated");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900">Order Management</h1>
        <p className="text-slate-500 mt-1 text-sm">
          View and update order statuses.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {loading ? (
          <p className="text-slate-500 text-sm">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-slate-500 text-sm">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">ID</th>
                  <th className="px-4 py-3 font-bold">User</th>
                  <th className="px-4 py-3 font-bold">Items</th>
                  <th className="px-4 py-3 font-bold">Total</th>
                  <th className="px-4 py-3 font-bold">Shipping Address</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">#{o.id}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[150px] truncate">
                      {o.userEmail}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {o.orderItems?.length || 0} items
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      ${o.totalAmount?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-[150px] truncate">
                      {o.shippingAddress}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className={`rounded-xl px-3 py-1 text-sm font-bold border-0 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${STATUS_COLORS[o.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
