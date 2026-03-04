import { paymentHttp } from "../api/http";

export async function createPaymentSession(payload) {
  const res = await paymentHttp.post("/checkout", payload);
  return res.data; // returns Payment with id
}
