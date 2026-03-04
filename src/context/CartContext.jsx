import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id,name,price,imageUrl,sku,stock,qty}

  function addToCart(product, qty = 1) {
    const stock = Number(product?.stock ?? 0);
    if (stock <= 0) return toast.error("Out of stock");

    setItems((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        const nextQty = Math.min(existing.qty + qty, stock);
        toast.success("Added to cart");
        return prev.map((x) => (x.id === product.id ? { ...x, qty: nextQty } : x));
      }
      toast.success("Added to cart");
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price || 0),
          imageUrl: product.imageUrl,
          sku: product.sku,
          stock,
          qty: Math.min(qty, stock),
          category: product.category,
        },
      ];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
    toast.success("Removed from cart");
  }

  function setQty(id, qty) {
    setItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const next = Math.max(1, Math.min(Number(qty), x.stock || 999));
        return { ...x, qty: next };
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  const cartCount = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items]);

  // free shipping incentive
  const freeShipThreshold = 15000;
  const shipping = subtotal >= freeShipThreshold ? 0 : 600;
  const total = subtotal + shipping;

  const value = {
    items,
    cartCount,
    subtotal,
    shipping,
    total,
    freeShipThreshold,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}