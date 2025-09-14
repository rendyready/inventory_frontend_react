const customStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      justifyContent: 'center',
      whiteSpace: 'nowrap', // opsional: supaya header tidak pecah baris
    },
  },
  cells: {
    style: {
      justifyContent: 'center',
      whiteSpace: 'nowrap',   // ✅ tidak wrap
      overflow: 'visible',    // ✅ biarkan isi meluber
      textOverflow: 'unset',  // ✅ jangan pakai ...
    },
  },
};

export default customStyles;
