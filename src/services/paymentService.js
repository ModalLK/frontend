import { paymentHttp } from "../api/http";

export async function createPaymentSession(payload) {
  const res = await paymentHttp.post("/checkout", payload);
  return res.data;
}

export async function getAllPayments() {
  const res = await paymentHttp.get("");
  return res.data;
}

export async function getPaymentById(id) {
  const res = await paymentHttp.get(`/${id}`);
  return res.data;
}
