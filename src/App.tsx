import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import QuizPage from './components/QuizPage';
import DiscoveryKitPage from './components/DiscoveryKitPage';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setIsMobileMenuOpen(false);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
    setCurrentPage('products');
  };

  const handleBackFromDiscoveryKit = () => {
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onProductSelect={handleProductSelect} />;
      case 'products':
        return <ProductsPage onProductSelect={handleProductSelect} />;
      case 'detail':
        return <ProductDetailPage product={selectedProduct} onBack={handleBackFromDetail} />;
      case 'quiz':
        return <QuizPage onProductSelect={handleProductSelect} onNavigate={handleNavigate} />;
      case 'discovery-kit':
        return <DiscoveryKitPage onBack={handleBackFromDiscoveryKit} />;
      default:
        return <HomePage onNavigate={handleNavigate} onProductSelect={handleProductSelect} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main>
          {renderCurrentPage()}
        </main>

        <Footer />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;