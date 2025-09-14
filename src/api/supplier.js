import axios from '../axios';

export const getSupplier = () => axios.get('/api/supplier');
export const createSupplier = data => axios.post('/api/supplier/create', data);
export const updateSupplier = (id, data) => axios.post(`/api/supplier/update/${id}`, data);
export const deleteSupplier = id => axios.delete(`/api/supplier/delete/${id}`);
