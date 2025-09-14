import React from "react";
import Modal from "../ui/Modal";

export default function PurchaseDetail({ isOpen, onClose, purchase }) {
  if (!purchase) return null;

  const statusColors = {
    verified: "text-green-600",
    pending: "text-yellow-600",
    rejected: "text-red-600",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Pembelian">
      <div className="space-y-4">
        {/* Informasi utama */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Tanggal</p>
            <p className="font-semibold">
              {purchase.purchase_date
                ? new Date(purchase.purchase_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`font-semibold ${
                statusColors[purchase.status] || "text-gray-600"
              }`}
            >
              {purchase.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Supplier</p>
            <p className="font-semibold">{purchase.supplier?.name || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold">
              Rp {Number(purchase.total || 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Daftar Item */}
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Items</h3>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border text-center">Produk</th>
                <th className="px-2 py-1 border text-center">Qty</th>
                <th className="px-2 py-1 border text-center">Harga</th>
                <th className="px-2 py-1 border text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {purchase.items?.length ? (
                purchase.items.map((item, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="px-2 py-1 border">{item.product?.name || "-"}</td>
                    <td className="px-2 py-1 border">{item.qty}</td>
                    <td className="px-2 py-1 border">
                      Rp {Number(item.price || 0).toLocaleString()}
                    </td>
                    <td className="px-2 py-1 border">
                      Rp {(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-2 text-gray-500">
                    Tidak ada item
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
