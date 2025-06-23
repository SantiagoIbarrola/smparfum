import React from 'react';
import { Heart, Star } from 'lucide-react';

const ProductCard = ({ product, onProductSelect }) => {
  const handleClick = () => {
    onProductSelect(product);
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Heart Icon */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-purple-600">
            ₲{product.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-600 font-medium">{product.brand}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.8</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Decant Options */}
        {product.decants && (
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Decants desde:</span>
            <span className="font-semibold text-purple-600">
              ₲{product.decants[0].price.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;