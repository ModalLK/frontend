import { productHttp } from "../api/http";

export async function getAllProducts() {
  const res = await productHttp.get("");
  return res.data;
}

export async function getProductById(id) {
  const res = await productHttp.get(`/${id}`);
  return res.data;
}
