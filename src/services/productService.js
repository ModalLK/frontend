import { productHttp } from "../api/http";

export async function getAllProducts() {
  const res = await productHttp.get("");
  return res.data;
}
