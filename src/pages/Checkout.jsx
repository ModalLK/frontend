import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { createPaymentSession } from "../services/paymentService";
import { formatCurrency } from "../utils/format";

export default function Checkout() {
  const nav = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();

  const [step, setStep] = useState(1); // 1=shipping, 2=payment
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

      // Payload you send to payment-service
      const payload = {
        customer: shippingForm,
        payment: cardForm, // in real payments, NEVER send raw card details unless it's a mock system
        cart: items.map((x) => ({
          productId: x.id,
          name: x.name,
          price: x.price,
          qty: x.qty,
        })),
        amounts: { subtotal, shipping, total },
      };

      // Integration point (match your backend)
      const res = await createPaymentSession(payload);

      // Option A: your payment service returns redirectUrl
      if (res?.redirectUrl) {
        window.location.href = res.redirectUrl;
        return;
      }

      // Option B: mock success
      toast.success("Payment successful!");
      clearCart();
      nav(`/success?paymentId=${res.id}`);
    } catch (e) {
      toast.error(e.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8">
        <h2 className="text-xl font-extrabold">No items to checkout</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add products to your cart first.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold">Checkout</h1>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
            Step {step} / 2
          </span>
        </div>

        {step === 1 && (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-extrabold">Shipping Address</p>

            {["fullName", "phone", "address", "city"].map((key) => (
              <div key={key}>
                <label className="text-xs font-bold text-slate-600">
                  {key}
                </label>
                <input
                  value={shippingForm[key]}
                  onChange={(e) =>
                    setShippingForm((s) => ({ ...s, [key]: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              disabled={!canGoStep2}
              onClick={() => setStep(2)}
              className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-blue-700 disabled:bg-slate-300"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-extrabold">
              Payment (Mock / Integration Point)
            </p>

            <div>
              <label className="text-xs font-bold text-slate-600">
                Card Number
              </label>
              <input
                value={cardForm.cardNumber}
                onChange={(e) =>
                  setCardForm((s) => ({ ...s, cardNumber: e.target.value }))
                }
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-slate-600">EXP</label>
                <input
                  value={cardForm.exp}
                  onChange={(e) =>
                    setCardForm((s) => ({ ...s, exp: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">CVC</label>
                <input
                  value={cardForm.cvc}
                  onChange={(e) =>
                    setCardForm((s) => ({ ...s, cvc: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-extrabold hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={payNow}
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-blue-700 disabled:bg-slate-300"
              >
                {loading ? "Processing..." : `Pay ${formatCurrency(total)}`}
              </button>
            </div>

            <p className="text-xs text-slate-500">
              If you use a real gateway later, don’t send card details from
              frontend to your backend directly. For this assignment, your mock
              payment service is fine.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border bg-white p-4">
        <p className="text-lg font-extrabold">Summary</p>
        <div className="mt-3 space-y-2 text-sm">
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
          <div className="flex justify-between border-t pt-3">
            <span className="font-extrabold">Total</span>
            <span className="font-extrabold">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
          {items.length} items
        </div>
      </div>
    </div>
  );
}
