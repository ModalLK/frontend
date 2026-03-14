import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

const initialCustomer = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
};

export default function CheckoutPage() {
  const nav = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();

  const [customer, setCustomer] = useState(initialCustomer);
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [loading, setLoading] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items],
  );

  function handleCustomerChange(e) {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!customer.fullName.trim()) return "Full name is required";
    if (!customer.phone.trim()) return "Phone number is required";
    if (!customer.address.trim()) return "Address is required";
    if (!customer.city.trim()) return "City is required";
    if (!items.length) return "Your cart is empty";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      await placeOrder({
        customerName: customer.fullName,
        phone: customer.phone,
        shippingAddress: customer.address,
        city: customer.city,
        paymentMethod,
      });

      await clearCart();
      toast.success("Order placed successfully");
      nav("/success");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black">Checkout</h1>
        <p className="mt-2 text-sm text-black">
          Complete your order and confirm payment
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
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none "
                  placeholder="Enter full name"
                  required
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
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Enter phone number"
                  required
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
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Enter address"
                  required
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
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Enter city"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900">
              Payment Method
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["CARD", "COD"].map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-4 transition ${
                    paymentMethod === method
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  <span className="font-medium text-slate-700">
                    {method === "CARD" ? "Card" : "Cash on Delivery"}
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
          </div>

          <button
            type="submit"
            disabled={loading || !items.length}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#902bf5]  px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1fe0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing order..." : `Pay ${formatCurrency(total)}`}
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
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-slate-800">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity} | Size: {item.size}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {formatCurrency(item.subtotal)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
