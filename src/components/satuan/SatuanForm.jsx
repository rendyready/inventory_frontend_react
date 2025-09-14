import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';

export default function SatuanForm({ onSubmit, initialData = null, onCancel }) {
  const [nama, setNama] = useState('');

  useEffect(() => {
    setNama(initialData?.name || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nama.trim());
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nama" className="form-label">Nama Satuan</label>
        <input
          type="text"
          id="nama"
          className="form-control"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>
      
      <div className="d-flex justify-content-end gap-2">
       <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan</Button>
        <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 me-2">Batal</Button>

      </div>
    </form>
  );
}
