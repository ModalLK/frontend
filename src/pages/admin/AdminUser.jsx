import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_API_URL}/admin/users`,
        { headers }
      );
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_USER_API_URL}/admin/users/${id}`,
        { headers }
      );
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_USER_API_URL}/admin/users/${id}/role?role=${newRole}`,
        {},
        { headers }
      );
      toast.success("Role updated successfully");
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900">User Management</h1>
        <p className="text-slate-500 mt-1 text-sm">
          View, edit roles and delete users.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {loading ? (
          <p className="text-slate-500 text-sm">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-500 text-sm">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">ID</th>
                  <th className="px-4 py-3 font-bold">Name</th>
                  <th className="px-4 py-3 font-bold">Email</th>
                  <th className="px-4 py-3 font-bold">Phone</th>
                  <th className="px-4 py-3 font-bold">Role</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">#{u.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{u.email}</td>
                    <td className="px-4 py-3 text-slate-600">{u.phone || "-"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="rounded-xl border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        <option value="ROLE_USER">USER</option>
                        <option value="ROLE_ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
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
