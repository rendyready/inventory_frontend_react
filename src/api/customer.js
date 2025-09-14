import axios from '../axios';

export const getCustomer = () => axios.get('/api/customer');
export const createCustomer = data => axios.post('/api/customer/create', data);
export const updateCustomer = (id, data) => axios.post(`/api/customer/update/${id}`, data);
export const deleteCustomer = id => axios.delete(`/api/customer/delete/${id}`);
