import { useEffect, useState } from "react";
import "../styles/products.css";
import { getProducts } from "../services/productsService";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Products error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-page">
      <h2 className="page-title">Products</h2>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-card" key={p._id || p.id}>
              <div className="product-icon">📦</div>

              <h3>{p.name}</h3>

              <p className="price">${p.price}</p>

              <p
                className={`stock ${
                  p.stock === 0 ? "out" : p.stock < 5 ? "low" : ""
                }`}
              >
                {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
              </p>

              <button className="edit-btn">Edit</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
