import React, { useState, useEffect } from 'react';
import ProductGrid from '../../components/penjualan/ProductGrid';
import CartList from '../../components/penjualan/CartList';
import PaymentSummary from '../../components/penjualan/PaymentSummary';
import PaymentModal from '../../components/penjualan/PaymentModal';
import NotaForm from '../../components/penjualan/NotaForm';

import {
  getProdukPenjualan,
  addItemToTempSale,
  getTempSaleDetail,
  getActiveTempSale,
  updateTempSaleItem,
  deleteTempSaleItem,
} from '../../api/penjualan';

const PenjualanPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingItemId, setLoadingItemId] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getActiveTempSale();
        setNota(res.data);

        const items = res.data.items.map(item => ({
          id: item.id, // <- penting untuk update/delete
          product_id: item.product_id,
          name: item.product.name,
          price: item.price,
          qty: item.qty,
        }));
        setCartItems(items);
      } catch (err) {
        console.warn('Belum ada nota aktif:', err?.response?.data?.message);
        setNota(null);
        setCartItems([]);
      }

      await fetchProducts();
      setLoading(false);
    };

    init();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProdukPenjualan();
      setProducts(res.data);
    } catch (err) {
      console.error('Gagal memuat produk penjualan:', err);
    }
  };

  const fetchTempSaleItems = async () => {
    try {
      if (!nota?.id) return;
      const res = await getTempSaleDetail(nota.id);
      const items = res.data.items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        name: item.product.name,
        price: item.price,
        qty: item.qty,
      }));
      setCartItems(items);
    } catch (err) {
      console.error('Gagal memuat temp sale items:', err);
    }
  };

  const addToCart = async (product) => {
  if (!nota?.id) {
    alert('Nota belum dibuat!');
    return;
  }

  // Cek apakah produk sudah ada di cart
  const existingItem = cartItems.find(item => item.product_id === product.id);

  if (existingItem) {
    // Jika ada, update qty-nya
    try {
      await updateTempSaleItem(existingItem.id, {
        qty: existingItem.qty + 1,
        price: existingItem.price, // Atau product.sell_price kalau mau ambil dari sumber produk
      });
      await fetchTempSaleItems();
    } catch (err) {
      console.error('Gagal update qty:', err);
    }
  } else {
    // Jika belum ada, tambahkan baru
    try {
      await addItemToTempSale({
        temp_sale_id: nota.id,
        product_id: product.id,
        qty: 1,
        price: parseInt(product.sell_price),
      });

      await fetchTempSaleItems();
    } catch (err) {
      console.error('Gagal menyimpan ke temp sale item:', err);
    }
  }
};

  const updateQty = async (productId, newQty) => {
  if (newQty < 1) return;

  const itemIndex = cartItems.findIndex(i => i.product_id === productId);
  if (itemIndex === -1) return;

  const item = cartItems[itemIndex];

  // Optimistic update
  const updatedItems = [...cartItems];
  updatedItems[itemIndex] = { ...item, qty: newQty };
  setCartItems(updatedItems);

  setLoadingItemId(productId);

  try {
    await updateTempSaleItem(item.id, {
      qty: newQty,
      price: item.price,
    });
    // Jika sukses, kita tidak perlu fetch ulang
  } catch (err) {
    console.error('Gagal update qty:', err);
    // (Opsional) bisa rollback ke qty sebelumnya
  } finally {
    setLoadingItemId(null);
  }
};

  const removeItem = async (productId) => {
    const item = cartItems.find(i => i.product_id === productId);
    if (!item) return;

    try {
      await deleteTempSaleItem(item.id);
      await fetchTempSaleItems();
    } catch (err) {
      console.error('Gagal menghapus item:', err);
    }
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setShowPayment(false);
    fetchProducts();
    setNota(null);
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (!nota) {
    return (
      <NotaForm
        onNext={(data) => {
          setNota(data);
          fetchTempSaleItems();
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        <ProductGrid products={products} onAdd={addToCart} />
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <CartList
          items={cartItems}
          onQtyChange={updateQty}
          onRemove={removeItem}
          loadingItemId={loadingItemId}
        />

        <PaymentSummary
          items={cartItems}
          onPay={() => {
            fetchTempSaleItems();
            setShowPayment(true);
          }}
        />
      </div>

      {showPayment && (
       <PaymentModal
          tempSaleId={nota.id}
          notaNumber={nota.nota_number}
          customerName={nota.customer_name}
          phone={nota.phone}
          items={cartItems}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />

      )}
    </div>
  );
};

export default PenjualanPage;
