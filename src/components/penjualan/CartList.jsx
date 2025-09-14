import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const formatRupiah = (angka) => {
  if (!angka) return 'Rp. 0';
  const number = typeof angka === 'number' ? angka : parseInt(angka);
  return 'Rp. ' + number.toLocaleString('id-ID');
};

const CartList = ({ items, onQtyChange, onRemove, loadingItemId }) => {
  const [localQty, setLocalQty] = useState({});

  useEffect(() => {
    const initialQty = {};
    items.forEach(item => {
      initialQty[item.product_id] = String(item.qty);
    });
    setLocalQty(initialQty);
  }, [items]);

  const handleInputChange = (productId, value) => {
    // Hanya angka
    if (/^\d*$/.test(value)) {
      setLocalQty(prev => ({
        ...prev,
        [productId]: value,
      }));
    }
  };

  const handleBlurOrEnter = (productId) => {
    const parsed = parseInt(localQty[productId]);
    if (!isNaN(parsed) && parsed > 0) {
      onQtyChange(productId, parsed);
    }
  };

  const incrementQty = (productId) => {
    const current = parseInt(localQty[productId]) || 1;
    const newQty = current + 1;
    setLocalQty(prev => ({ ...prev, [productId]: String(newQty) }));
    onQtyChange(productId, newQty);
  };

  const decrementQty = (productId) => {
    const current = parseInt(localQty[productId]) || 1;
    if (current > 1) {
      const newQty = current - 1;
      setLocalQty(prev => ({ ...prev, [productId]: String(newQty) }));
      onQtyChange(productId, newQty);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">Keranjang</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Belum ada item</p>
      ) : (
        <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
          {items.map(item => {
            const isLoading = loadingItemId === item.product_id;
            return (
              <div
                key={item.product_id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {formatRupiah(item.price)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQty(item.product_id)}
                    className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={localQty[item.product_id] || ''}
                    onChange={e => handleInputChange(item.product_id, e.target.value)}
                    onBlur={() => handleBlurOrEnter(item.product_id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleBlurOrEnter(item.product_id);
                        e.target.blur();
                      }
                    }}
                    className="w-16 border rounded px-2 py-1 text-center"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => incrementQty(item.product_id)}
                    className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(item.product_id)}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartList;
