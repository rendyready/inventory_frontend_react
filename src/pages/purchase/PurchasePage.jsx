import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import PurchaseTable from "../../components/purchase/PurchaseTable";
import PurchaseForm from "../../components/purchase/PurchaseForm";
import PurchaseEditForm from "../../components/purchase/PurchaseEditForm";
import PurchaseDetail from "../../components/purchase/PurchaseDetail";
import Modal from "../../components/ui/Modal";
import { getPurchaseById } from "../../api/purchases";

export default function PurchasePage() {
  const [showCreate, setShowCreate] = useState(false);
  const [editData, setEditData] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [detailData, setDetailData] = useState(null);

  // Fetch detail saat detailId berubah
  useEffect(() => {
    if (detailId) {
      getPurchaseById(detailId)
        .then((res) => setDetailData(res.data))
        .catch(() => setDetailData(null));
    }
  }, [detailId]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Pembelian</h1>
        <Button onClick={() => setShowCreate(true)}>+ Tambah Pembelian</Button>
      </div>

      {/* Tabel */}
      <PurchaseTable
        onEdit={(purchase) => setEditData(purchase)}
        onDetail={(purchase) => setDetailId(purchase.id)} // ⬅️ simpan id, bukan objek
      />

      {/* Modal Create */}
      {showCreate && (
        <Modal title="Tambah Pembelian" onClose={() => setShowCreate(false)}>
          <PurchaseForm onClose={() => setShowCreate(false)} />
        </Modal>
      )}

      {/* Modal Edit */}
      {editData && (
        <Modal
          title={`Edit Pembelian #${editData.id}`}
          onClose={() => setEditData(null)}
        >
          <PurchaseEditForm
            initialData={editData}
            onClose={() => setEditData(null)}
          />
        </Modal>
      )}

      {/* Modal Detail */}
      <PurchaseDetail
        isOpen={!!detailData}
        onClose={() => setDetailData(null)}
        purchase={detailData}
      />

    </div>
  );
}
