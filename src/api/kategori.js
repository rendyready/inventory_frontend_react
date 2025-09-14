import axios from '../axios';

export const getKategori = () => axios.get('/api/kategori');
export const createKategori = data => axios.post('/api/kategori/create', data);
export const updateKategori = (id, data) => axios.post(`/api/kategori/update/${id}`, data);
export const deleteKategori = id => axios.delete(`/api/kategori/delete/${id}`);
