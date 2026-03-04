import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center">
      <p className="text-3xl">✅</p>
      <h1 className="mt-3 text-2xl font-extrabold">Payment Successful</h1>
      <p className="mt-2 text-sm text-slate-600">
        Your order has been placed. You can view it in Orders.
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/orders"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-blue-700"
        >
          Go to Orders
        </Link>
        <Link
          to="/products"
          className="rounded-xl border px-4 py-2 text-sm font-extrabold hover:bg-slate-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
