import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
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

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500 text-lg font-medium">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1 text-sm">Welcome back, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Orders"
          value={orders.length}
        />
        <StatCard
          title="Total Users"
          value={users.length}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
        />
      </div>

      {/* Charts & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-black text-slate-800 mb-4">
            Order Status Breakdown
          </h2>
          {chartData.length === 0 ? (
            <p className="text-slate-400 text-sm">No order data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-black text-slate-800 mb-4">
            Recent Orders
          </h2>
          {orders.length === 0 ? (
            <p className="text-slate-400 text-sm">No orders yet.</p>
          ) : (
            <div className="overflow-auto max-h-64">
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="pb-3 font-bold">ID</th>
                    <th className="pb-3 font-bold">User</th>
                    <th className="pb-3 font-bold">Total</th>
                    <th className="pb-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 8).map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-50 hover:bg-slate-50"
                    >
                      <td className="py-3 font-semibold">#{order.id}</td>
                      <td className="py-3 truncate max-w-[120px] text-slate-600">
                        {order.userEmail}
                      </td>
                      <td className="py-3 font-semibold">
                        ${order.totalAmount?.toFixed(2)}
                      </td>
                      <td className="py-3">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor:
                              (STATUS_COLORS[order.status] || "#6b7280") + "22",
                            color: STATUS_COLORS[order.status] || "#6b7280",
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
