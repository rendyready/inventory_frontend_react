Inventory Frontend React
Sistem Inventori frontend yang dibangun dengan React.
Digunakan untuk mengelola data produk, penjualan, kategori, pelanggan, dan supplier via
antarmuka pengguna web.
■ Fitur
- Autentikasi / login
- Manajemen Produk, Kategori, Pelanggan, Supplier, Satuan, dsb
- Modul penjualan dan pembayaran
- Dashboard dengan ringkasan statistik
- UI responsif dengan sidebar + topbar layout
■ Teknologi
- React
- Tailwind CSS untuk styling
- Axios untuk HTTP request
- Struktur folder terorganisir (components, pages, routes, dsb)
- Pengelolaan status ringan jika perlu (custom hooks atau context)
■ Cara Mulai
git clone https://github.com/rendyready/inventory_frontend_react.git
cd inventory_frontend_react
npm install
# atau
yarn
npm start
# atau
yarn start
Buka di browser: http://localhost:3000
■■ Konfigurasi
- Atur file `.env` jika ada (misalnya REACT_APP_API_URL dll)
- Pastikan backend siap untuk API endpoint sesuai yang digunakan di frontend
■ Struktur Folder (sekilas)
src/
■■■ api/ # file untuk panggilan HTTP ke backend
■■■ auth/ # hook terkait autentikasi
■■■ components/ # komponen UI (form, tabel, modal, dsb)
■■■ pages/ # halaman (Dashboard, Login, produk, supplier, etc)
■■■ routes/ # konfigurasi rute aplikasi
■■■ store/ # state/global (jika digunakan)
public/
■■■ index.html
.gitignore
package.json
tailwind.config.js
■ License
Untuk penggunaan dan kontribusi, silakan hubungi pemilik repo.
