import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllProducts, deleteProduct } from "../../services/productService";
import { formatCurrency } from "../../utils/format";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <AdminLayout>
       <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Admin Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all products in the system.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="rounded-xl bg-[#902bf5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7a1fe0]"
        >
          Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-slate-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-bold">Image</th>
                <th className="px-4 py-3 font-bold">Name</th>
                <th className="px-4 py-3 font-bold">SKU</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Price</th>
                <th className="px-4 py-3 font-bold">Stock</th>
                <th className="px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="px-4 py-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-14 w-14 rounded-xl bg-slate-100 object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/100?text=No+Image";
                      }}
                    />
                  </td>

                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {p.name}
                  </td>
                  <td className="px-4 py-3">{p.sku}</td>
                  <td className="px-4 py-3">{p.category || "-"}</td>
                  <td className="px-4 py-3">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3">{p.stock}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/products/${p.id}`}
                        className="rounded-xl border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:bg-slate-50"
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/products/edit/${p.id}`}
                        className="rounded-xl border border-indigo-200 px-3 py-2 font-bold text-indigo-700 hover:bg-indigo-50"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="rounded-xl border border-red-200 px-3 py-2 font-bold text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </AdminLayout>
   
  );
}
