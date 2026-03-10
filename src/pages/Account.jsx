import { Link } from "react-router-dom";

export default function Account() {
  const user = { name: "Demo User", email: "demo@modallk.com" };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900">Account</h1>
        <p className="mt-3 text-sm font-semibold text-slate-700">{user.name}</p>
        <p className="text-sm text-slate-500">{user.email}</p>

        <div className="mt-6 space-y-3">
          <Link
            to="/orders"
            className="block rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            View Orders
          </Link>
          <Link
            to="/wishlist"
            className="block rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Wishlist
          </Link>
          <button className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Sign out
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-wide text-slate-500">
          Overview
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Orders", v: "12" },
            { k: "Delivered", v: "9" },
            { k: "In Progress", v: "3" },
          ].map((x) => (
            <div key={x.k} className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {x.k}
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
