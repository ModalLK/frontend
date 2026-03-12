import { productHttp } from "../api/http";

export async function getAllProducts() {
  const res = await productHttp.get("");
  return res.data;
}

export async function getProductById(id) {
  const res = await productHttp.get(`/${id}`);
  return res.data;
}

export async function createProduct(payload) {
  const res = await productHttp.post("", payload);
  return res.data;
}

export async function updateProduct(id, payload) {
  const res = await productHttp.put(`/${id}`, payload);
  return res.data;
}

export async function uploadProductImage(id, file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await productHttp.post(`/${id}/image`, formData, {
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

export async function checkStock(productId, quantity) {
  const res = await productHttp.post("/check-stock", { productId, quantity });
  return res.data;
}
