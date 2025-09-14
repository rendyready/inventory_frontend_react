import axios from '../axios';

export const getProduk = () => axios.get('/api/produk');
export const createProduk = data => axios.post('/api/produk/create', data);
export const updateProduk = (id, data) => axios.post(`/api/produk/update/${id}`, data);
export const deleteProduk = id => axios.delete(`/api/produk/delete/${id}`);
