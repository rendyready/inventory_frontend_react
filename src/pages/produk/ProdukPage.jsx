import { useEffect, useState } from 'react';
import {
  getProduk,
  createProduk,
  updateProduk,
  deleteProduk,
} from '../../api/produk';
import { getKategori } from '../../api/kategori';
import { getSatuan } from '../../api/satuan';
import ProdukTable from '../../components/produk/ProdukTable';
import ProdukForm from '../../components/produk/ProdukForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function ProdukPages() {
  const [produk, setProduk] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [satuan, setSatuan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProduk = async () => {
    setLoading(true);
    try {
      const res = await getProduk();
      setProduk(res.data.data);
    } catch (err) {
      toast.error('Gagal memuat data Produk');
    } finally {
      setLoading(false);
    }
  };

  const fetchKategoriDanSatuan = async () => {
    try {
      const [resKategori, resSatuan] = await Promise.all([
        getKategori(),
        getSatuan(),
      ]);
      setKategori(resKategori.data.data);
      setSatuan(resSatuan.data.data);
    } catch (err) {
      toast.error('Gagal memuat kategori atau satuan');
    }
  };

  useEffect(() => {
    fetchProduk();
    fetchKategoriDanSatuan();
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
        const res = await deleteProduk(id);
        toast.success(res.data.message);
        fetchProduk();
      } catch (err) {
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (formData) => {

    try {
      let res;
      if (editData) {
        res = await updateProduk(editData.id, formData);
      } else {
        res = await createProduk(formData);
      }

      toast.success(res.data.message);
      fetchProduk();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const handleCloseModal = () => {
    setEditData(null);
    setShowModal(false);
  };

  const filteredProduk = produk.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mb-3">
      <div className="container mt-3 mb-5">
        <h3 className="mb-4 text-gray-800 font-bold p-3 rounded border shadow-sm bg-white">
          MASTER PRODUK
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari Produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            + Tambah Produk
          </Button>
        </div>

        {showModal && (
          <Modal
            key={editData?.id || 'new'}
            title={editData ? 'Edit Produk' : 'Input Produk'}
            onClose={handleCloseModal}
          >
            <ProdukForm
              key={editData?.id || 'new-form'}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              initialData={editData}
              kategori={kategori}
              satuan={satuan}
            />
          </Modal>
        )}

        {loading ? (
          <p className="text-center py-10">Memuat data produk...</p>
        ) : (
          <ProdukTable
            data={filteredProduk}
            onEdit={(item) => {
              setEditData(item);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Card>
  );
}
