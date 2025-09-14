import { useEffect, useState } from 'react';
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from '../../api/kategori';
import KategoriTable from '../../components/kategori/KategoriTable';
import KategoriForm from '../../components/kategori/KategoriForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function KategoriPages() {
  const [kategori, setKategori] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchKategori = async () => {
    try {
      const res = await getKategori();
      setKategori(res.data.data);
    } catch (err) {
      toast.error('Gagal memuat data kategori');
    }
  };

  useEffect(() => {
    fetchKategori();
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
        const res = await deleteKategori(id);
        toast.success(res.data.message);
        fetchKategori();
      } catch (err) {
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let res;
      if (editData) {
        res = await updateKategori(editData.id, formData);
      } else {
        res = await createKategori(formData);
      }

      toast.success(res.data.message);
      fetchKategori();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const handleCloseModal = () => {
    setEditData(null);
    setShowModal(false);
  };

  const filteredKategori = kategori.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mb-3">
      <div className="container mt-3 mb-5">
        <h3 className="mb-4 text-gray-800 font-bold p-3 rounded border shadow-sm bg-white">
          MASTER KATEGORI
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            + Tambah Kategori
          </Button>
        </div>

        {showModal && (
          <Modal
            title={editData ? 'Edit Kategori' : 'Input Kategori'}
            onClose={handleCloseModal}
          >
            <KategoriForm
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              initialData={editData}
            />
          </Modal>
        )}

        <KategoriTable
          data={filteredKategori}
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
