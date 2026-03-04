import ProductCard from "../components/ProductCard";

const dummyProducts = [
  {
    id: 1,
    sku: "SKU-001",
    name: "T-Shirt",
    price: 2500,
    stock: 12,
    category: "Clothing",
    imageUrl: "https://via.placeholder.com/400x300?text=T-Shirt",
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Running Shoes",
    price: 8900,
    stock: 0,
    category: "Footwear",
    imageUrl: "https://via.placeholder.com/400x300?text=Shoes",
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Face Cream",
    price: 3200,
    stock: 6,
    category: "Skincare",
    imageUrl: "https://via.placeholder.com/400x300?text=Face+Cream",
  },
];

export default function Catalog({ onBuy }) {
  return (
    <div className="container">
      <h1>Product Catalog</h1>

      <div className="grid">
        {dummyProducts.map((p) => (
          <ProductCard key={p.id} product={p} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
}