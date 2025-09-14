import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';

export default function ProdukForm({
  onSubmit,
  onCancel,
  initialData = null,
  kategori = [],
  satuan = [],
}) {
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    kategori: '',
    stok: '',
    min_stok: '',
    satuan: '',
    hrg_beli: '',
    hrg_jual: '',
  });

  useEffect(() => {
    if (initialData) {
      // console.log('initialData received:', initialData);

      setForm({
        nama: initialData.name || '',
        deskripsi: initialData.description || '',
        kategori: initialData.category_id || '',
        stok: initialData.stock ?? '',
        min_stok: initialData.min_stock ?? '',
        satuan: initialData.unit_id || '',
        hrg_beli: initialData.buy_price ?? '',
        hrg_jual: initialData.sell_price ?? '',
      });
    }
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto pr-1">
      <div className="mb-3">
        <label htmlFor="nama" className="form-label">Nama Produk</label>
        <input
          type="text"
          id="nama"
          name="nama"
          className="form-control"
          value={form.nama}
          onChange={handleChange}
          required
        />

        <label htmlFor="deskripsi" className="form-label mt-2">Deskripsi</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          className="form-control"
          style={{ height: '120px' }}
          value={form.deskripsi}
          onChange={handleChange}
          required
        ></textarea>

        <label className="form-label mt-2">Kategori</label>
        <select
          name="kategori"
          className="form-control"
          value={form.kategori}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Pilih Kategori</option>
          {kategori.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <label className="form-label mt-2">Stok</label>
        <input
          type="number"
          name="stok"
          className="form-control"
          value={form.stok}
          onChange={handleChange}
          required
        />

        <label className="form-label mt-2">Minimal Stok</label>
        <input
          type="number"
          name="min_stok"
          className="form-control"
          value={form.min_stok}
          onChange={handleChange}
          required
        />

        <label className="form-label mt-2">Satuan</label>
        <select
          name="satuan"
          className="form-control"
          value={form.satuan}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Pilih Satuan</option>
          {satuan.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <label className="form-label mt-2">Harga Beli</label>
        <input
          type="number"
          name="hrg_beli"
          className="form-control"
          value={form.hrg_beli}
          onChange={handleChange}
          required
        />

        <label className="form-label mt-2">Harga Jual</label>
        <input
          type="number"
          name="hrg_jual"
          className="form-control"
          value={form.hrg_jual}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan</Button>
        <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600">Batal</Button>
      </div>
    </form>
  );
}
