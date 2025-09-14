import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useLogout from '../../auth/useLogout';

export default function Topbar({ toggleSidebar }) {
  const logout = useLogout();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle('d-none');
    }
  };

  // Fungsi untuk ubah path jadi judul
  const getPageTitle = (path) => {
    const cleanPath = path.split('/')[1]; // Ambil segmen pertama
    if (!cleanPath) return 'Dashboard';

    return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1); // Kapitalisasi
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div
      className="shadow px-4 py-3 d-flex justify-content-between align-items-center border-bottom"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <div className="d-flex align-items-center gap-3">
        <button onClick={toggleSidebar} className="btn btn-outline-secondary">
          <i className="bi bi-list"></i>
        </button>
        <h5 className="m-0">{pageTitle}</h5>
      </div>

      <div className="position-relative">
        <button className="btn btn-light border" onClick={toggleDropdown}>
          <i className="bi bi-person-circle me-2"></i>
          User
        </button>
        <div
          ref={dropdownRef}
          id="dropdownMenu"
          className="dropdown-menu d-none show mt-2 shadow"
          style={{ right: 0, left: 'auto' }}
        >
          <button className="dropdown-item">Profile</button>
          <button className="dropdown-item" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
