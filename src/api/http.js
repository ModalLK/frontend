import axios from "axios";

const productBaseURL = import.meta.env.VITE_PRODUCT_API_URL;   // e.g. http://localhost:8081/api/products
const paymentBaseURL = import.meta.env.VITE_PAYMENT_API_URL;   // e.g. http://localhost:8082/api/payments
const orderBaseURL   = import.meta.env.VITE_ORDER_API_URL;     // optional if you have order-service

export const productHttp = axios.create({ baseURL: productBaseURL });
export const paymentHttp = axios.create({ baseURL: paymentBaseURL });
export const orderHttp   = axios.create({ baseURL: orderBaseURL });

// common interceptor
function attachInterceptors(client) {
  if (!client) return;
  client.interceptors.response.use(
    (res) => res,
    (err) => {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Request failed";
      return Promise.reject(new Error(msg));
    }
  );
}

attachInterceptors(productHttp);
attachInterceptors(paymentHttp);
attachInterceptors(orderHttp);
