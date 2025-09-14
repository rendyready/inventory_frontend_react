import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import KategoriPage from '../pages/kategori/KategoriPage';
import SatuanPage from '../pages/satuan/SatuanPage';
import SupplierPage from '../pages/supplier/SupplierPage';
import CustomerPage from '../pages/customer/CustomerPage';
import ProdukPage from '../pages/produk/ProdukPage';
import PenjualanPage from '../pages/penjualan/PenjualanPage';
import PurchasePage from '../pages/purchase/PurchasePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
           <Route path="kategori" element={<KategoriPage />} />
           <Route path="satuan" element={<SatuanPage />} />
           <Route path="supplier" element={<SupplierPage />} />
           <Route path="customer" element={<CustomerPage />} />
           <Route path="produk" element={<ProdukPage />} />
           <Route path="penjualan" element={<PenjualanPage />} />
           <Route path="pembelian" element={<PurchasePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
