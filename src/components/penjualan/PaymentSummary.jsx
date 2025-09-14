import React from 'react';
import Button from '../../components/ui/Button';

const PaymentSummary = ({ items, onPay }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-4">
      <h2 className="text-xl font-bold mb-2">Ringkasan Pembayaran</h2>
      <div className="flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>Rp {total.toLocaleString()}</span>
      </div>
      <Button
        onClick={onPay}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold"
        disabled={items.length === 0}
      >
        Bayar Sekarang
      </Button>
    </div>
  );
};

export default PaymentSummary;
