import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { createPenjualan } from '../../api/penjualan';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { PacmanLoader } from 'react-spinners';

const PaymentModal = ({
  tempSaleId,
  customerName,
  phone,
  onClose,
  onSuccess,
  items = [],
  notaNumber = ''
}) => {
  const [bayar, setBayar] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const kembalian = bayar ? bayar - total : 0;

  const formatRupiah = (angka) => {
    return 'Rp ' + angka.toLocaleString('id-ID');
  };

  const handleBayarChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const clean = raw.replace(/^0+/, '');
    setBayar(clean ? parseInt(clean) : '');
  };

  const handleSubmit = async () => {
    if (bayar < total) {
      setError('Jumlah bayar kurang dari total.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        temp_sale_id: tempSaleId,
        bayar,
        kembalian,
        nota_number: notaNumber,
      };
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await createPenjualan(payload);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Gagal menyimpan transaksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBayar('');
    setError('');
    setSuccess(false);
    onClose();
  };

  const handleSelesai = () => {
    setBayar('');
    setError('');
    setSuccess(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-md shadow-md w-full max-w-md p-6 relative overflow-hidden"
      >
        {/* Loading overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <PacmanLoader color="#0070BA" size={20} />

                <div className="text-center mt-4">
                  <div className="text-lg font-semibold text-gray-800">Please wait</div>
                  <div className="text-sm text-gray-500">Payment in progress</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Tombol Close */}
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
          onClick={handleClose}
          disabled={loading}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Pembayaran</h2>

        {/* Info Nota */}
        <div className="mb-3 text-sm text-gray-600 border border-gray-200 rounded p-3">
          <div><strong>ID Temp Sale:</strong> {tempSaleId}</div>
          {customerName && <div><strong>Customer:</strong> {customerName}</div>}
          {phone && <div><strong>Telepon:</strong> {phone}</div>}
        </div>

        {/* Total */}
        <div className="mb-2 flex justify-between">
          <span>Total:</span>
          <span className="font-semibold">{formatRupiah(total)}</span>
        </div>

        {/* Input Bayar */}
        {!success && (
          <>
            <div className="mb-2">
              <label className="block text-sm font-medium">Bayar:</label>
              <input
                type="text"
                value={bayar ? formatRupiah(bayar) : ''}
                onChange={handleBayarChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
                className="w-full border rounded p-2 mt-1"
                placeholder="Jumlah bayar"
                inputMode="numeric"
                autoFocus
              />
            </div>

            {/* Kembalian */}
            <div className="mb-4 flex justify-between">
              <span>Kembalian:</span>
              <span className="font-semibold text-green-700">
                {formatRupiah(kembalian > 0 ? kembalian : 0)}
              </span>
            </div>
          </>
        )}

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Tombol Aksi */}
        {success ? (
          <div className="flex justify-end">
            <Button className="bg-green-600 text-white" onClick={handleSelesai}>
              Selesai
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Batal
            </Button>
            <Button
              className="bg-blue-600 text-white"
              onClick={handleSubmit}
              disabled={loading || items.length === 0 || !bayar}
            >
              Bayar
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentModal;
