import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addCartItem,
  clearCartApi,
  getMyCart,
  removeCartItem,
  updateCartItem,
} from "../services/orderService";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadCart() {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const data = await getMyCart();
      setCart(data);
    } catch {
      setCart({ cartItems: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

 
async function addToCart(product, quantity = 1, size = "M") {
  const data = await addCartItem({
    productId: product.id,
    productName: product.name,
    price: Number(product.price),
    quantity,
    size,
  });
  setCart(data);
}


  async function setQty(itemId, quantity) {
    const data = await updateCartItem(itemId, { quantity });
    setCart(data);
  }

  async function removeFromCart(itemId) {
    const data = await removeCartItem(itemId);
    setCart(data);
  }

  async function clearCart() {
    await clearCartApi();
    setCart({ cartItems: [], totalAmount: 0 });
  }

  const items = cart?.cartItems || [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.subtotal || 0),
    0,
  );
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + shipping;
  const cartCount = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  const value = useMemo(
    () => ({
      items,
      subtotal,
      shipping,
      total,
      cartCount,
      freeShipThreshold: 5000,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      reloadCart: loadCart,
      loading,
    }),
    [items, subtotal, shipping, total, cartCount, loading],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
