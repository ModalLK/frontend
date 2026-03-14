import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="bg-white p-10 text-center">
      

      <h1 className="mt-5 text-3xl font-semibold text-black">
        Payment Successful
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        Your order has been placed successfully. You can review it from the
        orders page.
      </p>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/orders"
          className="rounded-xl bg-[#902bf5] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
        >
          Go to Orders
        </Link>
        <Link
          to="/products"
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
