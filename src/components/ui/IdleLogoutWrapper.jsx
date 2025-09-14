import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function IdleLogoutWrapper({ children }) {
  const navigate = useNavigate();

  const handleOnIdle = () => {
    localStorage.removeItem('token'); // hapus token atau session client-side
    navigate('/login'); // redirect ke login
  };

  useIdleTimer({
    timeout: 15 * 60 * 1000, // 15 menit
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return children;
}
