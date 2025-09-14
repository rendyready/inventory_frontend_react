import DataTable from 'react-data-table-component';
import Button from '../../components/ui/Button';
import customStyles from '../../components/ui/customStyles';
import dayjs from 'dayjs';

export default function ProdukTable({ data, onEdit, onDelete }) {
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '70px',
    },
    {
      name: 'Nama Produk',
      selector: (row) => row.name,
      sortable: true,
       wrap: false,
        width: '150px',
    },
     {
      name: 'Deskripsi',
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
      width: '250px',  
    },
     {
      name: 'Kategori',
      selector: (row) => row.category,
      sortable: true,
    },
     {
      name: 'Sisa Stok',
      selector: (row) => row.stock,
      sortable: true,
       wrap: false, 
      width: '120px',  
    },
     {
      name: 'Minimal Stok',
      selector: (row) => row.min_stock,
      sortable: true,
       wrap: false, 
      width: '150px',  
    },
     {
      name: 'Satuan',
      selector: (row) => row.unit,
      sortable: true,
    },
     {
      name: 'Harga Beli',
      selector: (row) => row.buy_price,
      sortable: true,
       wrap: false, 
      width: '120px',  
    },
    {
      name: 'Harga Jual',
      selector: (row) => row.sell_price,
      sortable: true,
      wrap: false, 
      width: '120px',  
    },
    {
      name: 'Produk Dibuat',
      selector: (row) => dayjs(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
      sortable: true,
        wrap: false, 
        width: '200px',  
    },
    {
      name: 'Produk Update',
      selector: (row) => dayjs(row.updated_at).format('DD-MM-YYYY HH:mm:ss'),
      sortable: true,
         wrap: false, 
       width: '200px',  
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex justify-center gap-2">
          <Button variant="warning" size="sm" onClick={() => onEdit(row)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(row.id)}>
            Hapus
          </Button>
        </div>
      ),
      width: '200px',
    },
  ];

  return (
    <div className="overflow-x-auto">
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
      responsive
      customStyles={customStyles}
      noDataComponent="Data belum tersedia."
      dense
    />
  </div>
  );
}
