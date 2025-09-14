import React, { useState } from 'react';
import Button from '../../components/ui/Button';
// import { createTempSale } from '../../api/penjualanTemp';
import { createTempSale } from '../../api/penjualan';


const generateNotaNumber = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const nomor = `INV-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return nomor;
};

const NotaForm = ({ onNext }) => {
  const [notaNumber] = useState(generateNotaNumber());
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');


const handleSubmit = async () => {
  try {
    const res = await createTempSale({
      customer_name: customerName,
      phone: phone,
    });

    onNext(res.data); // kirim data nota ke PenjualanPage
  } catch (error) {
    console.error('Gagal membuat nota:', error);
    alert('Gagal membuat nota. Coba lagi.');
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4">Buat Nota</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">No. Nota</label>
        <input
          type="text"
          value={notaNumber}
          readOnly
          className="w-full border rounded p-2 mt-1 bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Nama Customer</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="Opsional"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">No. Telepon</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="Opsional"
        />
      </div>

      <Button className="w-full bg-blue-600 text-white" onClick={handleSubmit}>
        Lanjut ke Produk
      </Button>
    </div>
  );
};

export default NotaForm;
