import { useState } from "react";
import Catalog from "./pages/Catalog";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleBuy(product) {
    setSelectedProduct(product);
  }

  return (
    <>
      <Catalog onBuy={handleBuy} />

      {selectedProduct && (
        <div className="container">
          <div className="card">
            <h2>Selected Product</h2>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(selectedProduct, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
