import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { createPaymentSession } from "../services/paymentService";
import { formatCurrency } from "../utils/format";

export default function Checkout() {
  const nav = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    exp: "",
    cvc: "",
  });

  const canGoStep2 = useMemo(() => {
    return (
      shippingForm.fullName.trim() &&
      shippingForm.phone.trim() &&
      shippingForm.address.trim() &&
      shippingForm.city.trim()
    );
  }, [shippingForm]);

  async function payNow() {
    try {
      setLoading(true);

      const payload = {
        customer: shippingForm,
        payment: cardForm,
        cart: items.map((x) => ({
          productId: x.id,
          name: x.name,
          price: x.price,
          qty: x.qty,
        })),
        amounts: { subtotal, shipping, total },
      };

      const res = await createPaymentSession(payload);

      if (res?.redirectUrl) {
        window.location.href = res.redirectUrl;
        return;
      }

      if (res?.status === "SUCCESS") {
        toast.success("Payment successful!");
        clearCart();
        nav(`/success?paymentId=${res.id}`);
        return;
      }

      toast.error("Payment failed");
    } catch (e) {
      toast.error(e.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">
          No items to checkout
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add products to your cart first.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-900">Checkout</h1>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            Step {step} / 2
          </span>
        </div>

        {step === 1 && (
          <div className="mt-6 space-y-4">
            <p className="text-sm font-black uppercase tracking-wide text-slate-500">
              Shipping Address
            </p>

            {["fullName", "phone", "address", "city"].map((key) => (
              <div key={key}>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {key}
                </label>
                <input
                  value={shippingForm[key]}
                  onChange={(e) =>
                    setShippingForm((s) => ({ ...s, [key]: e.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            ))}

            <button
              disabled={!canGoStep2}
              onClick={() => setStep(2)}
              className="mt-2 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:bg-slate-300"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            <p className="text-sm font-black uppercase tracking-wide text-slate-500">
              Payment Details
            </p>

            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Card Number
              </label>
              <input
                value={cardForm.cardNumber}
                onChange={(e) =>
                  setCardForm((s) => ({ ...s, cardNumber: e.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Expiry
                </label>
                <input
                  value={cardForm.exp}
                  onChange={(e) =>
                    setCardForm((s) => ({ ...s, exp: e.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  CVC
                </label>
                <input
                  value={cardForm.cvc}
                  onChange={(e) =>
                    setCardForm((s) => ({ ...s, cvc: e.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={payNow}
                disabled={loading}
                className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:bg-slate-300"
              >
                {loading ? "Processing..." : `Pay ${formatCurrency(total)}`}
              </button>
            </div>

            <p className="text-xs leading-6 text-slate-500">
              This is a mock payment flow for assignment purposes. In a real
              application, sensitive payment details should be handled by a
              secure payment gateway.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xl font-black text-slate-900">Summary</p>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-bold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Shipping</span>
            <span className="font-bold">
              {shipping === 0 ? "FREE" : formatCurrency(shipping)}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-4">
            <span className="font-black text-slate-900">Total</span>
            <span className="font-black text-slate-900">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-xs font-medium text-slate-600">
          {items.length} items in your cart
        </div>
      </div>
    </div>
  );
}
