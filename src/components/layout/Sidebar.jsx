import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSidebarStore from '../../store/sidebar';

export default function Sidebar() {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen); // dari Zustand
  const [dropdowns, setDropdowns] = useState({
    master: false,
    transaksi: false,
    laporan: false,
    pengaturan: false,
    cashflow: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className="text-dark border-end d-flex flex-column shadow position-fixed top-0 start-0"
      style={{
        width: isSidebarOpen ? '250px' : '0px',
        height: '100vh',
        overflowX: 'hidden',
        backgroundColor: '#f5f5f5',
        transition: 'width 0.3s',
        zIndex: 1000,
      }}
    >
      {isSidebarOpen && (
        <div className="p-3">
          <Link
            to="/"
            className="d-flex align-items-center mb-4 text-dark text-decoration-none fw-bold fs-5"
          >
            <i className="bi bi-scissors me-2"></i>
            JAITOYA.COM
          </Link>

          <ul className="nav nav-pills flex-column mb-auto">
            <SidebarItem
              title="Master Data"
              icon="bi-collection"
              isOpen={dropdowns.master}
              onClick={() => toggleDropdown('master')}
              items={[
                ['Kategori', '/kategori'],
                ['Produk', '/produk'],
                ['Satuan', '/satuan'],
                ['Supplier', '/supplier'],
                ['Customer', '/customer'],
              ]}
            />

            <SidebarItem
              title="Transaksi"
              icon="bi-cart-check"
              isOpen={dropdowns.transaksi}
              onClick={() => toggleDropdown('transaksi')}
              items={[
                ['Pembelian', '/pembelian'],
                ['Penjualan', '/penjualan'],
              ]}
            />

            <SidebarItem
              title="Laporan"
              icon="bi-file-earmark-text"
              isOpen={dropdowns.laporan}
              onClick={() => toggleDropdown('laporan')}
              items={[
                ['Stok', '/laporan/stok'],
                ['Pembelian', '/laporan/pembelian'],
                ['Penjualan', '/laporan/penjualan'],
              ]}
            />

            <SidebarItem
              title="Pengaturan"
              icon="bi-gear"
              isOpen={dropdowns.pengaturan}
              onClick={() => toggleDropdown('pengaturan')}
              items={[
                ['User', '/pengaturan/user'],
                ['Toko', '/pengaturan/toko'],
              ]}
            />
          </ul>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ title, icon, isOpen, onClick, items }) {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen); // untuk menutup sidebar

  return (
    <li>
      <a
        href="#"
        className="nav-link text-dark d-flex justify-content-between align-items-center"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <span>
          <i className={`bi ${icon} me-2`}></i>
          {title}
        </span>
        <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      </a>

      {isOpen && (
        <ul className="nav flex-column ms-3">
          {items.map(([name, path]) => (
            <li key={path}>
              <Link
                to={path}
                className="nav-link text-dark"
                onClick={() => {
                  if (path === '/penjualan') {
                    setIsSidebarOpen(false);
                  }
                }}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

