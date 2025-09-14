import { useEffect, useState } from 'react';
import {
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../../api/supplier';
import SupplierTable from '../../components/supplier/SupplierTable';
import SupplierForm from '../../components/supplier/SupplierForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function SupplierPages() {
  const [supplier, setSupplier] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSupplier = async () => {
    try {
      const res = await getSupplier();
      setSupplier(res.data.data);
    } catch (err) {
      toast.error('Gagal memuat data Supplier');
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: 'Yakin ingin menghapus?',
        text: 'Data akan hilang permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        customClass: {
            confirmButton: 'swal-confirm-button',
            cancelButton: 'swal-cancel-button',
        },
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteSupplier(id);
        toast.success(res.data.message);
        fetchSupplier();
      } catch (err) {
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let res;
      if (editData) {
        res = await updateSupplier(editData.id, formData);
      } else {
        res = await createSupplier(formData);
      }

      toast.success(res.data.message);
      fetchSupplier();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const handleCloseModal = () => {
    setEditData(null);
    setShowModal(false);
  };

  const filteredSupplier = supplier.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mb-3">
      <div className="container mt-3 mb-5">
        <h3 className="mb-4 text-gray-800 font-bold p-3 rounded border shadow-sm bg-white">
          MASTER SUPPLIER
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            + Tambah Supplier
          </Button>
        </div>

        {showModal && (
          <Modal
            title={editData ? 'Edit Supplier' : 'Input Supplier'}
            onClose={handleCloseModal}
          >
            <SupplierForm
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              initialData={editData}
            />
          </Modal>
        )}

        <SupplierTable
          data={filteredSupplier}
          onEdit={(item) => {
            setEditData(item);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </Card>
  );
}
