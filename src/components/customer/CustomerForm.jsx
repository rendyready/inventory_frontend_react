import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';

export default function CustomerForm({ onSubmit, initialData = null, onCancel }) {
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setNama(initialData?.name || '');
    setPhone(initialData?.phone || '');
    setAddress(initialData?.address || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nama.trim());
    formData.append('phone', phone.trim());
    formData.append('address', address.trim());
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nama" className="form-label">Nama Customer</label>
        <input
          type="text"
          id="nama"
          className="form-control"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
         <label for="phone" class="form-label">Nomor Telepon Customer</label>
          <input
          type="text"
          id="phone"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

            <label for="address" class="form-label">Alamat Customer</label>
            <textarea
            id="address"
            className="form-control"
            style={{ height: '120px' }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            ></textarea>
      </div>
      
      <div className="d-flex justify-content-end gap-2">
       <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan</Button>
        <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 me-2">Batal</Button>

      </div>
    </form>
  );
}
