// src/components/purchase/PurchaseTable.jsx
import React, { useEffect, useState } from "react";
import { getPurchases, deletePurchase, verifyPurchase } from "../../api/purchases";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PurchaseTable = ({ onEdit, onDetail }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      const res = await getPurchases();
      // ✅ backend return { data: [...] }
      setPurchases(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat data pembelian");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data pembelian akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePurchase(id);
          toast.success("Pembelian berhasil dihapus");
          loadPurchases();
        } catch (err) {
          toast.error("Gagal menghapus pembelian");
        }
      }
    });
  };

  const handleVerify = async (id) => {
    try {
      await verifyPurchase(id);
      toast.success("Pembelian diverifikasi dan stok diperbarui");
      loadPurchases();
    } catch (err) {
      toast.error("Gagal verifikasi pembelian");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Supplier</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length > 0 ? (
            purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="p-2 border">{purchase.id}</td>
                <td className="p-2 border">{purchase.purchase_date}</td>
                <td className="p-2 border">
                  {purchase.supplier?.name || "-"}
                </td>
                <td className="p-2 border">
                  Rp {Number(purchase.total).toLocaleString()}
                </td>
                <td className="p-2 border">
                  {purchase.status === "verified" ? (
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </td>
                <td className="p-2 border flex gap-2 justify-center">
                 <button
                  onClick={() => onDetail(purchase)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Detail
                </button>
                  <button
                    onClick={() => onEdit(purchase)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(purchase.id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  {purchase.status !== "verified" && (
                    <button
                      onClick={() => handleVerify(purchase.id)}
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                Belum ada data pembelian
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
