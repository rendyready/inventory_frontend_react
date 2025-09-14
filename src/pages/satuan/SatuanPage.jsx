import { useEffect, useState } from 'react';
import {
  getSatuan,
  createSatuan,
  updateSatuan,
  deleteSatuan,
} from '../../api/satuan';
import SatuanTable from '../../components/satuan/SatuanTable';
import SatuanForm from '../../components/satuan/SatuanForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function SatuanPages() {
  const [satuan, setSatuan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSatuan = async () => {
    try {
      const res = await getSatuan();
      setSatuan(res.data.data);
    } catch (err) {
      toast.error('Gagal memuat data satuan');
    }
  };

  useEffect(() => {
    fetchSatuan();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data akan hilang permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteSatuan(id);
        toast.success(res.data.message);
        fetchSatuan();
      } catch (err) {
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let res;
      if (editData) {
        res = await updateSatuan(editData.id, formData);
      } else {
        res = await createSatuan(formData);
      }

      toast.success(res.data.message);
      fetchSatuan();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const handleCloseModal = () => {
    setEditData(null);
    setShowModal(false);
  };

  const filteredSatuan = satuan.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mb-3">
      <div className="container mt-3 mb-5">
        <h3 className="mb-4 text-gray-800 font-bold p-3 rounded border shadow-sm bg-white">
          MASTER SATUAN
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari satuan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            + Tambah Satuan
          </Button>
        </div>

        {showModal && (
          <Modal
            title={editData ? 'Edit Satuan' : 'Input Satuan'}
            onClose={handleCloseModal}
          >
            <SatuanForm
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              initialData={editData}
            />
          </Modal>
        )}

        <SatuanTable
          data={filteredSatuan}
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
