import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import axios from "axios";

const STATUS_COLORS = {
  PENDING: "#f59e0b",
  CONFIRMED: "#3b82f6",
  SHIPPED: "#8b5cf6",
  DELIVERED: "#10b981",
  CANCELLED: "#ef4444",
};

const STATUS_BADGE = {
  PENDING:   "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED:   "bg-violet-100 text-violet-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const [ordersRes, usersRes, paymentsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_ORDER_API_URL}/admin/orders`, { headers }),
          axios.get(`${import.meta.env.VITE_USER_API_URL}/admin/users`, { headers }),
          axios.get(`${import.meta.env.VITE_PAYMENT_API_URL}/admin/payments`, { headers }),
        ]);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
        setPayments(paymentsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)
    .toFixed(2);

  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const completedPayments = payments.filter((p) => p.status === "COMPLETED").length;

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const barData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    orders: count,
  }));

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#902bf5] border-t-transparent" />
            <p className="text-sm font-medium text-slate-500">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="rounded-2xl bg-[#f3e8ff] px-4 py-2 text-sm font-bold text-[#902bf5]">
          Admin Panel
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon="🛒"
          gradient="bg-gradient-to-br from-[#902bf5] to-[#7a1fe0]"
          change={`${pendingOrders} pending`}
        />
        <StatCard
          title="Total Users"
          value={users.length}
          icon="👥"
          gradient="bg-gradient-to-br from-blue-500 to-blue-700"
          change="Registered"
        />
        <StatCard
          title="Total Revenue"
          value={`LKR ${Number(totalRevenue).toLocaleString()}`}
          icon="💰"
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
          change={`${completedPayments} paid`}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon="⏳"
          gradient="bg-gradient-to-br from-amber-500 to-amber-600"
          change="Need action"
        />
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Pie Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-black text-slate-800">Order Status Breakdown</h2>
          <p className="mb-4 text-xs text-slate-400">Distribution of all orders by status</p>
          {pieData.length === 0 ? (
            <p className="text-sm text-slate-400">No order data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-black text-slate-800">Orders by Status</h2>
          <p className="mb-4 text-xs text-slate-400">Count of orders per status</p>
          {barData.length === 0 ? (
            <p className="text-sm text-slate-400">No order data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
                  {barData.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status] || "#902bf5"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-800">Recent Orders</h2>
            <p className="text-xs text-slate-400">Latest 8 orders from the system</p>
          </div>
          <span className="rounded-full bg-[#f3e8ff] px-3 py-1 text-xs font-bold text-[#902bf5]">
            {orders.length} total
          </span>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-slate-400">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 transition hover:bg-slate-50">
                    <td className="py-3 pr-4 font-black text-slate-800">#{order.id}</td>
                    <td className="py-3 pr-4 max-w-[140px] truncate text-slate-500">
                      {order.userEmail}
                    </td>
                    <td className="py-3 pr-4 font-bold text-slate-800">
                      LKR {Number(order.totalAmount).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_BADGE[order.status] || "bg-slate-100 text-slate-600"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-xs">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
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
