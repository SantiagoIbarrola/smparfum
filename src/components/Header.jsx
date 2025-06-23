import React from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ currentPage, onNavigate, isCartOpen, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navigationItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'products', label: 'Colecciones' },
    { id: 'quiz', label: 'Quiz Olfativo' },
    { id: 'discovery-kit', label: 'Kit Descubrimiento' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
              SM Parfum
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                  currentPage === item.id 
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-purple-600 hover:bg-purple-50 rounded-lg ${
                    currentPage === item.id ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;