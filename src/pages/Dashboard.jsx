import { Package, ShoppingCart, Truck, Users } from 'lucide-react';
import { useEffect } from 'react';
import axios from '../axios'; // pastikan ini sudah disetup withCredentials

export default function Dashboard() {
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Jika perlu, ambil CSRF token dulu
//         await axios.get('/sanctum/csrf-cookie');

//         const response = await axios.get('/api/me');
//         console.log('User masih login:', response.data.user);
//       } catch (error) {
//         console.error('User tidak login atau token kadaluarsa:', error);
//         // Contoh redirect ke login
//         // navigate('/login');
//       }
//     };

//     checkAuth(); // panggil saat komponen dimount
//   }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Produk" value="128" icon={<Package className="text-blue-600" />} />
      <Card title="Penjualan" value="320" icon={<ShoppingCart className="text-green-600" />} />
      <Card title="Supplier" value="12" icon={<Truck className="text-orange-600" />} />
      <Card title="Customer" value="45" icon={<Users className="text-purple-600" />} />
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 border border-gray-100">
      <div className="bg-gray-100 p-3 rounded-lg">{icon}</div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-gray-500">{title}</div>
      </div>
    </div>
  );
}
