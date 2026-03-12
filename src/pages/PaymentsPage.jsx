import { useEffect, useState } from "react";
import { getAllPayments } from "../services/paymentService";
import { formatCurrency } from "../utils/format";
import toast from "react-hot-toast";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllPayments();
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Payments</h1>

      {loading ? (
        <p className="text-slate-500">Loading payments...</p>
      ) : payments.length === 0 ? (
        <p className="text-slate-500">No payments found.</p>
      ) : (
        <div className="grid gap-6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Payment #{payment.id}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {payment.customerName}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600">
                    {payment.status}
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrency(payment.total)}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <p>Method: {payment.paymentMethod}</p>
                <p>Created: {payment.createdAt}</p>
                {payment.gatewayTransactionId && (
                  <p>Transaction: {payment.gatewayTransactionId}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
