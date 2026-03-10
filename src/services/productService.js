import { productHttp } from "../api/http";

export async function getAllProducts() {
  const res = await productHttp.get("");
  return res.data;
}

export async function getProductById(id) {
  const res = await productHttp.get(`/${id}`);
  return res.data;
}

export async function createProduct(formData) {
  const res = await productHttp.post("", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateProduct(id, formData) {
  const res = await productHttp.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function deleteProduct(id) {
  const res = await productHttp.delete(`/${id}`);
  return res.data;
}
