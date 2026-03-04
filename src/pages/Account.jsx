import { Link } from "react-router-dom";

export default function Account() {
  // later read user details from auth context/token
  const user = { name: "Demo User", email: "demo@modallk.com" };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-xl font-extrabold">Account</h1>
        <p className="mt-2 text-sm text-slate-600">{user.name}</p>
        <p className="text-sm text-slate-500">{user.email}</p>

        <div className="mt-5 space-y-2">
          <Link
            to="/orders"
            className="block rounded-xl border px-3 py-2 text-sm font-bold hover:bg-slate-50"
          >
            View Orders
          </Link>
          <Link
            to="/wishlist"
            className="block rounded-xl border px-3 py-2 text-sm font-bold hover:bg-slate-50"
          >
            Wishlist
          </Link>
          <button className="w-full rounded-xl border px-3 py-2 text-sm font-bold hover:bg-slate-50">
            Sign out
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
        <p className="text-sm font-extrabold">Overview</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Orders", v: "12" },
            { k: "Delivered", v: "9" },
            { k: "In Progress", v: "3" },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">{x.k}</p>
              <p className="text-2xl font-extrabold">{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
