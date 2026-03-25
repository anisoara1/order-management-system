import { useState } from "react";
import { createProduct, updateProduct } from "../services/productsService";

export default function ProductForm({ product, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    stock: product.stock || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.id) {
      await updateProduct(product.id, form);
    } else {
      await createProduct(form);
    }

    onSaved();
    onClose();
  };

  return (
    <div className="card" style={{ marginBottom: "20px" }}>
      <h3>{product.id ? "Editează produs" : "Adaugă produs"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nume produs"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Preț"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Stoc"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />

        <button className="btn btn-primary" type="submit">
          Salvează
        </button>

        <button
          className="btn"
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={onClose}
        >
          Anulează
        </button>
      </form>
    </div>
  );
}
