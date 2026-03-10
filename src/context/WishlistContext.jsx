import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const WishCtx = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("wishlist_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist_items", JSON.stringify(items));
  }, [items]);

  function toggleWishlist(product) {
    setItems((prev) => {
      const exists = prev.some((x) => x.id === product.id);

      if (exists) {
        toast.success("Removed from wishlist");
        return prev.filter((x) => x.id !== product.id);
      }

      toast.success("Saved to wishlist");
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price || 0),
          imageUrl: product.imageUrl,
          sku: product.sku,
          category: product.category,
          description: product.description,
          stock: Number(product.stock || 0),
        },
      ];
    });
  }

  const count = useMemo(() => items.length, [items]);

  const value = {
    items,
    count,
    toggleWishlist,
  };

  return <WishCtx.Provider value={value}>{children}</WishCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishCtx);
  if (!ctx) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return ctx;
}
