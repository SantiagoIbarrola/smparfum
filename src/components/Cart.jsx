import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Carrito ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-500">
                  Añade algunos productos para comenzar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.variantId} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="font-semibold text-purple-600">
                          ₲{item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ₲{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-red-600 hover:text-red-700 text-sm font-medium py-2 transition-colors duration-200"
                  >
                    Vaciar Carrito
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-purple-600">
                  ₲{getCartTotal().toLocaleString()}
                </span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
                Proceder al Pago
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Envío gratis en compras superiores a ₲400.000
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;