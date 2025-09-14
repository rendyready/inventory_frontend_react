import axios from '../axios'; // pastikan ini file axios yang sudah set withCredentials + baseURL
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie'); // untuk validasi CSRF
      await axios.post('/api/logout'); // logout API

      localStorage.removeItem('user'); // bersihkan user data
      navigate('/login'); // redirect ke login
    } catch (error) {
      console.error('[useLogout] Logout gagal:', error);
    }
  };

  return logout;
}
