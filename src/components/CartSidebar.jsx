import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export default function CartSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const {
    items, subtotal, shipping, total,
    freeShipThreshold, removeFromCart, setQty,
  } = useCart();

  const remaining = Math.max(0, freeShipThreshold - subtotal);

  function handleCheckout() {
    onClose();
    navigate("/checkout");
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-black text-slate-900">
            Shopping Cart
            {items.length > 0 && (
              <span className="ml-2 text-sm font-semibold text-slate-400">
                ({items.length} items)
              </span>
            )}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        {items.length > 0 && (
          <div className="bg-[#f3e8ff] px-5 py-2 text-xs font-semibold text-[#902bf5] text-center">
            {remaining === 0
              ? "You unlocked free shipping!"
              : `Add ${formatCurrency(remaining)} more for free shipping`}
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-5 text-center">
              <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
              <p className="text-sm text-slate-500">Add products to your cart and continue shopping.</p>
              <Link
                to="/products"
                onClick={onClose}
                className="rounded-md bg-[#902bf5] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((x) => (
              <div key={x.id} className="flex gap-4 px-5 py-4">
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm">{x.productName}</p>
                  <p className="mt-0.5 text-xs text-slate-400">Size: {x.size}</p>
                  <p className="mt-1 text-sm font-black text-slate-900">{formatCurrency(x.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <select
                    value={x.quantity}
                    onChange={(e) => setQty(x.id, Number(e.target.value))}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-[#902bf5] focus:ring-2 focus:ring-[#f3e8ff]"
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button
                    onClick={async () => {
                      try {
                        await removeFromCart(x.id);
                        toast.success("Removed from cart");
                      } catch (error) {
                        toast.error(error?.response?.data?.message || "Failed to remove item");
                      }
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — summary + actions */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className="font-bold text-slate-900">{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3">
              <span className="font-black text-slate-900">Total</span>
              <span className="font-black text-slate-900">{formatCurrency(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-[#902bf5] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
            >
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
