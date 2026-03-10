import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    nav("/account");
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-black text-slate-900">Create Account</h1>
      <p className="mt-2 text-sm text-slate-500">
        Register to save your details and manage orders.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          placeholder="Full name"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          placeholder="Email"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          placeholder="Password"
          type="password"
        />
        <button className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">
          Create account
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-indigo-600">
          Login
        </Link>
      </p>
    </div>
  );
}
