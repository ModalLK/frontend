import { orderHttp } from "../api/http";

// If you have backend:
export async function getMyOrders() {
  const res = await orderHttp.get("/me");
  return res.data;
}

// mock fallback if order service not available
export function getMockOrders() {
  return [
    {
      id: "ORD-10021",
      date: "2026-03-04",
      status: "DELIVERED",
      total: 24500,
      items: [
        { name: "Face Serum", qty: 1, price: 8500 },
        { name: "T-Shirt", qty: 2, price: 8000 },
      ],
    },
    {
      id: "ORD-10022",
      date: "2026-03-02",
      status: "PROCESSING",
      total: 15600,
      items: [{ name: "Sneakers", qty: 1, price: 15600 }],
    },
  ];
}
