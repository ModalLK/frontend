import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    nav("/account");
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
      <h1 className="text-xl font-extrabold">Register</h1>
      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <input
          className="w-full rounded-xl border px-3 py-2 text-sm"
          placeholder="Full name"
        />
        <input
          className="w-full rounded-xl border px-3 py-2 text-sm"
          placeholder="Email"
        />
        <input
          className="w-full rounded-xl border px-3 py-2 text-sm"
          placeholder="Password"
          type="password"
        />
        <button className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-blue-700">
          Create account
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}
