import DataTable from 'react-data-table-component';
import Button from '../../components/ui/Button';
import customStyles from '../../components/ui/customStyles';

export default function SatuanTable({ data, onEdit, onDelete }) {
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '70px',
    },
    {
      name: 'Nama Satuan',
      selector: (row) => row.name,
      sortable: true,
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
    <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        noDataComponent="Data belum tersedia."
        />
  );
}
