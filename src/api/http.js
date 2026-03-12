import axios from "axios";

export const userHttp = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL,
});

export const productHttp = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API_URL,
});

export const orderHttp = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API_URL,
});

export const paymentHttp = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_API_URL,
});

const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

[userHttp, productHttp, orderHttp, paymentHttp].forEach((client) => {
  client.interceptors.request.use(attachToken, (error) =>
    Promise.reject(error),
  );
});
