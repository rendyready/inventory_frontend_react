import axios from '../axios';
import { getSupplier } from './supplier';
import { getProduk } from './produk';

// CRUD utama
export const getPurchases = () => axios.get('/api/purchases');
export const createPurchase = (data) => axios.post('/api/purchases', data);
export const updatePurchase = (id, data) => axios.put(`/api/purchases/${id}`, data);
export const deletePurchase = (id) => axios.delete(`/api/purchases/${id}`);
export const verifyPurchase = (id) => axios.post(`/api/purchases/${id}/verify`);
export const getPurchaseById = (id) => axios.get(`/api/purchases/${id}`);


// Wrapper untuk master data (supplier + produk)
export const getPurchaseMasters = async () => {
  const [supplierRes, productRes] = await Promise.all([
    getSupplier(),
    getProduk()
  ]);

  return {
    suppliers: supplierRes.data.data || supplierRes.data || [],
    products: productRes.data.data || productRes.data || [],
  };
};
