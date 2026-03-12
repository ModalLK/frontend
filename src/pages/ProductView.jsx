import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductById } from "../services/productService";
import { formatCurrency } from "../utils/format";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error(error.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
        Product not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-50 p-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-80 w-full object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/500?text=No+Image";
            }}
          />
        </div>

        <div>
          <p className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {product.category || "General"}
          </p>

          <h1 className="mt-4 text-3xl font-black text-slate-900">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-slate-500">SKU: {product.sku}</p>

          <p className="mt-5 text-3xl font-black text-slate-900">
            {formatCurrency(product.price)}
          </p>

          <p className="mt-3 text-sm text-slate-600">
            Stock: <span className="font-bold">{product.stock}</span>
          </p>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-black text-slate-900">Description</p>
            <p className="mt-2 leading-7">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              to={`/admin/products/edit/${product.id}`}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
            >
              Edit
            </Link>

            <Link
              to="/admin/products"
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
