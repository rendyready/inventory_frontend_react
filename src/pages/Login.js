import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // penting agar cookie terkirim!

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. CSRF
      await axios.get('/sanctum/csrf-cookie');

      // 2. Login
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      // 3. Simpan user/token
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      // 4. Redirect
      navigate('/');
    } catch (err) {
      setError('Login gagal. Cek email dan password!');
      console.error(err);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Login illustration"
        />
      </div>
      <form onSubmit={handleLogin} className="md:w-1/3 max-w-sm">
        {/* ... */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
        />

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
