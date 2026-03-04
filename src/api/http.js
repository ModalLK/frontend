import axios from "axios";

export const productHttp = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API,
});

export const paymentHttp = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_API,
});