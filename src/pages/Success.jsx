import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
        ✅
      </div>

      <h1 className="mt-5 text-3xl font-black text-slate-900">
        Payment Successful
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        Your order has been placed successfully. You can review it from the
        orders page.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/orders"
          className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Go to Orders
        </Link>
        <Link
          to="/products"
          className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
