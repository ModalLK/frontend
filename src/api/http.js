import axios from "axios";

export const productHttp = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API_URL,
});

export const paymentHttp = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_API_URL,
});

export const orderHttp = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API_URL,
});
