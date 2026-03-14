import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e8ff]">
            <svg className="h-7 w-7 text-[#902bf5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Wishlist is empty</h2>
          <p className="text-sm text-slate-500">
            Save products to your wishlist from the catalog or product page.
          </p>
          <Link
            to="/products"
            className="mt-2 inline-flex rounded-2xl bg-[#902bf5] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        {/* <div>
          <h1 className="text-2xl font-bold text-slate-900">Wishlist</h1>
          <p className="mt-1 text-sm text-slate-500">Products you've saved for later.</p>
        </div> */}
        <span className="rounded-full bg-[#f3e8ff] px-3 py-1 text-xs font-bold text-[#902bf5]">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">

          {/* Head */}
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">SKU</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {items.map((p) => (
              <tr key={p.id} className="transition ">

                {/* Product */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-contain p-1.5"
                        onError={(e) =>
                          (e.currentTarget.src = "https://via.placeholder.com/300?text=No+Image")
                        }
                      />
                    </div>
                    <span className="font-bold text-slate-900">{p.name}</span>
                  </div>
                </td>

                {/* SKU */}
                <td className="px-5 py-4 text-slate-400 font-mono text-xs">
                  {p.sku}
                </td>

                {/* Price */}
                <td className="px-5 py-4 font-bold text-slate-900">
                  {formatCurrency(p.price)}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="rounded-xl bg-[#902bf5] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#7a1fe0]"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(p)}
                      className="rounded-xl border border-red-200 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}