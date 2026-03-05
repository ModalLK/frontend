import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    // integrate auth service later
    nav("/account");
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
      <h1 className="text-xl font-extrabold">Login</h1>
      <form onSubmit={onSubmit} className="mt-5 space-y-3">
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
          Sign in
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-600">
        No account?{" "}
        <Link to="/register" className="font-bold text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
}
