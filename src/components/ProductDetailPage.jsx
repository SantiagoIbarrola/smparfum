import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailPage = ({ product, onBack }) => {
  const [selectedVariant, setSelectedVariant] = useState('bottle');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const getPrice = () => {
    if (selectedVariant === 'bottle') {
      return product.price;
    }
    const decant = product.decants?.find(d => d.size === selectedVariant);
    return decant?.price || product.price;
  };

  const handleAddToCart = () => {
    if (selectedVariant === 'bottle') {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    } else {
      const decant = product.decants?.find(d => d.size === selectedVariant);
      if (decant) {
        for (let i = 0; i < quantity; i++) {
          addToCart(product, decant);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-600 font-medium">{product.brand}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">4.8 (127 reseñas)</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Variant Selection */}
            {!product.isDiscoveryKit && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Selecciona tu opción:</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setSelectedVariant('bottle')}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                      selectedVariant === 'bottle'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Botella Completa</div>
                        <div className="text-sm text-gray-600">100ml - Para coleccionistas</div>
                      </div>
                      <div className="text-lg font-bold text-purple-600">₲{product.price.toLocaleString()}</div>
                    </div>
                  </button>

                  {product.decants?.map((decant) => (
                    <button
                      key={decant.size}
                      onClick={() => setSelectedVariant(decant.size)}
                      className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                        selectedVariant === decant.size
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">Decant {decant.size}</div>
                          <div className="text-sm text-gray-600">Perfecto para probar</div>
                        </div>
                        <div className="text-lg font-bold text-purple-600">₲{decant.price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Cantidad:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-purple-600">
                  ₲{(getPrice() * quantity).toLocaleString()}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>

            {/* Olfactory Pyramid */}
            {product.olfactoryPyramid && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pirámide Olfativa</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-600 mb-2">Notas de Salida</h4>
                    <p className="text-gray-700">{product.olfactoryPyramid.top.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-600 mb-2">Notas de Corazón</h4>
                    <p className="text-gray-700">{product.olfactoryPyramid.heart.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-600 mb-2">Notas de Fondo</h4>
                    <p className="text-gray-700">{product.olfactoryPyramid.base.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;