import { useEffect, useState } from 'react';
import axios from '../axios';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const checkAuth = async () => {
    try {
      await axios.get('/api/me');
      setIsAuthenticated(true);
    } catch (err) {
      if (err.response?.status === 401) {
        // Ini normal saat belum login
        console.info('[useAuth] Belum login, status 401');
      } else {
        console.error('[useAuth] Error cek auth:', err);
      }
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  checkAuth();
}, []);


  return { isAuthenticated, isLoading };
}
