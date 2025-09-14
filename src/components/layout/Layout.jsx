import Sidebar from './Sidebar';
import Topbar from './Topbar'; // ✅ tambahkan ini
import { Outlet } from 'react-router-dom';
import useSidebarStore from '../../store/sidebar';

export default function Layout() {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <>
      <Sidebar />

      <div
        className="min-vh-100 transition-all"
        style={{
          marginLeft: isSidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s',
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} /> {/* ✅ pakai komponen kamu */}

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
