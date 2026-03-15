import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createProduct,
  getProductById,
  updateProduct,
  uploadProductImage,
} from "../services/productService";

const initialForm = {
  sku: "",
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
};

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEdit);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        sku: form.sku,
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        description: form.description,
      };

      let savedProduct;

      if (isEdit) {
        savedProduct = await updateProduct(id, payload);
        if (imageFile) {
          await uploadProductImage(id, imageFile);
        }
        toast.success("Product updated successfully");
      } else {
        savedProduct = await createProduct(payload);
        if (imageFile && savedProduct?.id) {
          await uploadProductImage(savedProduct.id, imageFile);
        }
        toast.success("Product created successfully");
      }

      nav("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        const data = await getProductById(id);
        setForm({
          sku: data?.sku || "",
          name: data?.name || "",
          price: data?.price || "",
          stock: data?.stock || "",
          category: data?.category || "",
          description: data?.description || "",
        });
        setPreviewUrl(data?.imageUrl || "");
      } catch (error) {
        toast.error(error.message || "Failed to load product");
      } finally {
        setPageLoading(false);
      }
    })();
  }, [id, isEdit]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (pageLoading) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        Loading product...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-black text-slate-900">
        {isEdit ? "Edit Product" : "Create Product"}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Fill all required product details.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              SKU
            </label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none "
              required
              disabled={isEdit}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none "
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none "
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100"
          />

          {previewUrl && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-48 w-full rounded-xl object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Category
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => nav("/admin/products")}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-2xl bg-[#902bf5] px-4 py-3 text-sm font-bold text-white hover:bg-[#7a1fe0] disabled:bg-slate-300"
          >
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Product"
                : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
