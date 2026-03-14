import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(form);
      toast.success("Login successful");

      if (data?.role === "ROLE_ADMIN") {
        nav("/admin/dashboard", { replace: true });
        return;
      }

      const intendedPath = location.state?.from?.pathname;
      if (intendedPath) {
        nav(intendedPath, { replace: true });
        return;
      }

      nav("/", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-black text-slate-900">Login</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sign in to continue shopping and manage your orders.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          placeholder="Email"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          placeholder="Password"
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:bg-slate-300"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        No account?{" "}
        <Link to="/register" className="font-bold text-indigo-600">
          Register
        </Link>
      </p>
    </div>
  );
}
