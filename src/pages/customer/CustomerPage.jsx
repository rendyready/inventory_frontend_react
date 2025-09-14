import { useEffect, useState } from 'react';
import {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../api/customer';
import CustomerTable from '../../components/customer/CustomerTable';
import CustomerForm from '../../components/customer/CustomerForm';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function CustomerPages() {
  const [customer, setCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomer = async () => {
    try {
      const res = await getCustomer();
      setCustomer(res.data.data);
    } catch (err) {
      toast.error('Gagal memuat data Customer');
    }
  };

  useEffect(() => {
    fetchCustomer();
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
        const res = await deleteCustomer(id);
        toast.success(res.data.message);
        fetchCustomer();
      } catch (err) {
        toast.error('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      let res;
      if (editData) {
        res = await updateCustomer(editData.id, formData);
      } else {
        res = await createCustomer(formData);
      }

      toast.success(res.data.message);
      fetchCustomer();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const handleCloseModal = () => {
    setEditData(null);
    setShowModal(false);
  };

  const filteredCustomer = customer.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mb-3">
      <div className="container mt-3 mb-5">
        <h3 className="mb-4 text-gray-800 font-bold p-3 rounded border shadow-sm bg-white">
          MASTER CUSTOMER
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            + Tambah Customer
          </Button>
        </div>

        {showModal && (
          <Modal
            title={editData ? 'Edit Customer' : 'Input Customer'}
            onClose={handleCloseModal}
          >
            <CustomerForm
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
              initialData={editData}
            />
          </Modal>
        )}

        <CustomerTable
          data={filteredCustomer}
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
