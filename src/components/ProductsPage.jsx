import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { perfumesData } from '../data/perfumesData';

const ProductsPage = ({ onProductSelect }) => {
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const filters = [
    { id: 'todos', label: 'Todos', count: perfumesData.filter(p => !p.isDiscoveryKit).length },
    { id: 'mujer', label: 'Para Ella', count: perfumesData.filter(p => p.tags?.includes('mujer')).length },
    { id: 'hombre', label: 'Para Él', count: perfumesData.filter(p => p.tags?.includes('hombre')).length },
    { id: 'unisex', label: 'Unisex', count: perfumesData.filter(p => p.tags?.includes('unisex')).length },
    { id: 'kits', label: 'Kits', count: perfumesData.filter(p => p.isDiscoveryKit).length }
  ];

  const getFilteredProducts = () => {
    if (selectedFilter === 'todos') {
      return perfumesData.filter(p => !p.isDiscoveryKit);
    }
    if (selectedFilter === 'kits') {
      return perfumesData.filter(p => p.isDiscoveryKit);
    }
    return perfumesData.filter(p => p.tags?.includes(selectedFilter));
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestras Colecciones
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestra cuidada selección de fragancias de las mejores casas del mundo
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-semibold text-gray-900">Filtrar por categoría</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 text-xs opacity-75">({filter.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filters.find(f => f.id === selectedFilter)?.label}
            </h2>
            <span className="text-gray-600">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductSelect={onProductSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500">
                Prueba con otro filtro para ver más opciones
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;