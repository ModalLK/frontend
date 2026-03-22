import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useFormErrors } from "../hooks/useFormErrors";
import FieldError from "../components/FieldError";

export default function AdminLogin() {
  const nav = useNavigate();
  const { login } = useAuth();
  const { fieldErrors, applyErrors, clearError, resetErrors } = useFormErrors();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function onSubmit(e) {
    e.preventDefault();
    resetErrors();
    try {
      setLoading(true);
      const data = await login(form);

      if (data?.role !== "ROLE_ADMIN") {
        toast.error("Access denied. Admin accounts only.");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        return;
      }

      toast.success("Welcome back, Admin!");
      nav("/admin/dashboard", { replace: true });
    } catch (error) {
      applyErrors(error);
      const msg = error?.response?.data?.message;
      toast.error(msg || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-black outline-none transition ${
      fieldErrors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">

        {/* Admin badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-block rounded-full bg-[#902bf5]/10 px-4 py-1 text-xs font-bold text-[#902bf5] uppercase tracking-widest">
            Admin Portal
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-black text-center">Admin Sign In</h1>
        <p className="mt-2 text-xs text-slate-500 text-center">
          This portal is restricted to authorized administrators only.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass("email")}
              placeholder="Enter admin email"
            />
            <FieldError message={fieldErrors.email} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-black">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className={`${inputClass("password")} pr-12`}
                placeholder="Enter admin password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.168-3.34M6.343 6.343A9.956 9.956 0 0112 5c5 0 9 4 9 7a9.77 9.77 0 01-2.168 3.34M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <FieldError message={fieldErrors.password} />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition
              bg-[#902bf5] hover:bg-[#7a1fe0]
              disabled:bg-gray-300 disabled:text-gray-500"
          >
            {loading ? "Signing in..." : "Sign in to Admin"}
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-400 text-center">
          Not an admin?{" "}
          <a href="/login" className="font-bold text-[#902bf5] hover:underline">
            Go to customer login
          </a>
        </p>
      </div>
    </div>
  );
}