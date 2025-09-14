// src/components/purchase/PurchaseEditForm.jsx
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { getPurchaseMasters } from "../../api/purchases";

export default function PurchaseEditForm({ initialData, onClose }) {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplierId, setSupplierId] = useState(initialData.supplier?.id || "");
  const [items, setItems] = useState(
    initialData.items?.map((i) => ({
      product_id: i.product?.id || i.product_id,
      qty: i.qty,
      price: Number(i.price),
    })) || []
  );
  const [discount, setDiscount] = useState(initialData.discount || 0);

//   useEffect(() => {
//     axios.get("/api/suppliers").then((res) => setSuppliers(res.data));
//     axios.get("/api/products").then((res) => setProducts(res.data));
//   }, []);
useEffect(() => {
  const fetchMasters = async () => {
    try {
      const { suppliers, products } = await getPurchaseMasters();
      setSuppliers(suppliers);
      setProducts(products);
    } catch (err) {
      console.error("Gagal load master data:", err);
    }
  };

  fetchMasters();
}, []);


  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { product_id: "", qty: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const grandTotal = total - discount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/purchases/${initialData.id}`, {
        supplier_id: supplierId,
        items,
        total,
        discount,
        grand_total: grandTotal,
      });
      onClose(); // tutup modal
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate pembelian");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Supplier */}
      <div>
        <label className="block font-medium">Supplier</label>
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Pilih Supplier --</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Items */}
      <div className="space-y-2">
        <label className="block font-medium">Produk</label>
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <select
              value={item.product_id}
              onChange={(e) =>
                handleItemChange(index, "product_id", e.target.value)
              }
              className="border rounded p-2 w-1/3"
              required
            >
              <option value="">-- Pilih Produk --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.qty}
              onChange={(e) =>
                handleItemChange(index, "qty", Number(e.target.value))
              }
              className="border rounded p-2 w-1/4"
              min="1"
              required
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", Number(e.target.value))
              }
              className="border rounded p-2 w-1/3"
              min="0"
              required
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-2 text-blue-600"
        >
          + Tambah Produk
        </button>
      </div>

      {/* Summary */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Total:</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Diskon:</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border rounded p-1 w-24 text-right"
          />
        </div>
        <div className="flex justify-between font-bold">
          <span>Grand Total:</span>
          <span>Rp {grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </form>
  );
}
