import React, { useState } from 'react';

const formatRupiah = (angka) => {
  if (!angka) return 'Rp. 0';
  const number = typeof angka === 'number' ? angka : parseInt(angka);
  return 'Rp. ' + number.toLocaleString('id-ID');
};

const ProductGrid = ({ products, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Kategori unik dari data produk
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter produk
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Pilih Produk</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Cari produk..."
        className="w-full border rounded px-3 py-2 mb-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Kategori Toolbar */}
      <div className="flex overflow-x-auto gap-2 mb-4 pb-1">
        <button
          className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${
            selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setSelectedCategory('')}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-3 gap-2 max-h-[65vh] overflow-y-auto pr-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 hover:bg-blue-100 cursor-pointer transition bg-gray-200"
            onClick={() => onAdd(product)}
          >
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-gray-600">
              {formatRupiah(product.sell_price)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
