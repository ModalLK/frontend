import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createPaymentSession } from "../services/paymentService";
import { checkStock, reduceStock } from "../services/productService";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

const initialCustomer = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
};

export default function CheckoutPage() {
  const { items, clearCart } = useCart();

  const [customer, setCustomer] = useState(initialCustomer);
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price || 0);
      const qty = Number(item.qty || 1);
      return sum + price * qty;
    }, 0);
  }, [items]);

  const shipping = subtotal >= 5000 ? 0 : 350;
  const total = subtotal + shipping;

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!customer.fullName.trim()) return "Full name is required";
    if (!customer.phone.trim()) return "Phone number is required";
    if (!customer.address.trim()) return "Address is required";
    if (!customer.city.trim()) return "City is required";
    if (!items.length) return "Your cart is empty";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);
      setPaymentResult(null);

      for (const item of items) {
        const stockResult = await checkStock(item.id, Number(item.qty || 1));

        if (!stockResult.available) {
          toast.error(
            `${item.name}: only ${stockResult.availableStock} item(s) available`,
          );
          return;
        }
      }

      const payload = {
        customer: {
          fullName: customer.fullName,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
        },
        payment: {
          method: paymentMethod,
        },
        cart: items.map((item) => ({
          productId: item.id,
          qty: Number(item.qty || 1),
        })),
      };

      const result = await createPaymentSession(payload);
      setPaymentResult(result);

      if (result.status === "PAID") {
        for (const item of items) {
          await reduceStock(item.id, Number(item.qty || 1));
        }

        toast.success("Payment completed successfully");
        clearCart();
      } else {
        toast.error(result.failureReason || "Payment failed");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Checkout failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-500">
          Complete your order and confirm payment.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Customer Details
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleCustomerChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={customer.city}
                  onChange={handleCustomerChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                  placeholder="Enter city"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Payment Method
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {["CARD", "COD", "FAIL"].map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-4 transition ${
                    paymentMethod === method
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  <span className="font-medium text-slate-700">
                    {method === "CARD"
                      ? "Card"
                      : method === "COD"
                        ? "Cash on Delivery"
                        : "Mock Fail"}
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                </label>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Use <span className="font-semibold">FAIL</span> only for testing a
              failed payment response.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !items.length}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing payment..." : `Pay ${formatCurrency(total)}`}
          </button>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-slate-500">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-slate-100 pb-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-slate-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Qty: {item.qty || 1}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {formatCurrency((item.price || 0) * (item.qty || 1))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {paymentResult && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Payment Result
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Payment ID:</span>{" "}
                  {paymentResult.id}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {paymentResult.status}
                </p>
                <p>
                  <span className="font-semibold">Customer:</span>{" "}
                  {paymentResult.customerName}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  {formatCurrency(paymentResult.total || 0)}
                </p>
                {paymentResult.gatewayTransactionId && (
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {paymentResult.gatewayTransactionId}
                  </p>
                )}
                {paymentResult.failureReason && (
                  <p className="text-red-600">
                    <span className="font-semibold">Failure Reason:</span>{" "}
                    {paymentResult.failureReason}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
