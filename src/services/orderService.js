import { orderHttp } from "../api/http";

export async function getMyOrders() {
  const res = await orderHttp.get("/orders");
  return res.data;
}

export async function getOrderById(id) {
  const res = await orderHttp.get(`/orders/${id}`);
  return res.data;
}

export async function cancelOrder(id) {
  const res = await orderHttp.put(`/orders/${id}/cancel`);
  return res.data;
}

export async function getMyCart() {
  const res = await orderHttp.get("/cart");
  return res.data;
}

export async function addCartItem(payload) {
  const res = await orderHttp.post("/cart/add", payload);
  return res.data;
}

export async function updateCartItem(itemId, payload) {
  const res = await orderHttp.put(`/cart/items/${itemId}`, payload);
  return res.data;
}

export async function removeCartItem(itemId) {
  const res = await orderHttp.delete(`/cart/items/${itemId}`);
  return res.data;
}

export async function clearCartApi() {
  const res = await orderHttp.delete("/cart");
  return res.data;
}

export async function placeOrder(payload) {
  const res = await orderHttp.post("/orders", payload);
  return res.data;
}
