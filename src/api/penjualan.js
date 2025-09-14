import axios from '../axios';

export const getProdukPenjualan = () => axios.get('/api/penjualan/products');
export const createPenjualan = (data) => axios.post('/api/penjualan/create', data);

// ✅ Sesuaikan endpoint temp-sale
export const createTempSale = (data) => axios.post('/api/temp-sale/store', data);
export const addItemToTempSale = (data) => axios.post('/api/temp-sale/item', data);
export const getTempSaleDetail = (id) => axios.get(`/api/temp-sale/${id}`);
export const deleteTempSale = (id) => axios.delete(`/api/temp-sale/${id}`);
export const getActiveTempSale = () => axios.get('/api/temp-sale/active');

export const updateTempSaleItem = (id, data) => axios.put(`/api/temp-sale/item/${id}`, data);
export const deleteTempSaleItem = (id) => axios.delete(`/api/temp-sale/item/${id}`);
