export function formatCurrency(value) {
  const n = Number(value || 0);
  return n.toLocaleString("en-LK", { style: "currency", currency: "LKR" });
}
