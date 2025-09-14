import axios from '../axios';

export const getSatuan = () => axios.get('/api/satuan');
export const createSatuan = data => axios.post('/api/satuan/create', data);
export const updateSatuan = (id, data) => axios.post(`/api/satuan/update/${id}`, data);
export const deleteSatuan = id => axios.delete(`/api/satuan/delete/${id}`);
