import React from 'react';
import { Star, Truck, CreditCard, Gift } from 'lucide-react';
import ProductCard from './ProductCard';
import { perfumesData } from '../data/perfumesData';

const HomePage = ({ onNavigate, onProductSelect }) => {
  const featuredPerfumes = perfumesData.filter(p => [1, 2, 3].includes(p.id));
  const discoveryKit = perfumesData.find(p => p.id === 'discovery-kit');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Descubre tu
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Firma Olfativa
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Cada fragancia cuenta una historia. ¿Cuál es la tuya?
          </p>
          <button
            onClick={() => onNavigate('quiz')}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25"
          >
            Comenzar Quiz Olfativo
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-orange-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-white rounded-full animate-ping opacity-50"></div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Envío a Todo Paraguay", subtitle: "Desde Ciudad del Este" },
              { icon: CreditCard, title: "Pago Seguro", subtitle: "Múltiples opciones" },
              { icon: Gift, title: "Muestras Gratis", subtitle: "En cada pedido" }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-200">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Los Más Deseados</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las fragancias que han conquistado corazones en todo el mundo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPerfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                product={perfume}
                onProductSelect={onProductSelect}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('products')}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Ver Toda la Colección
            </button>
          </div>
        </div>
      </section>

      {/* Discovery Kit Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Kit de Descubrimiento
                <span className="block text-purple-600">SM Parfum</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ¿No sabes por dónde empezar? Nuestro Kit de Descubrimiento incluye 8 decants 
                cuidadosamente seleccionados de las mejores fragancias del mundo. 
                Además, incluye un voucher de ₲240.000 para tu próxima compra.
              </p>
              <div className="flex items-center space-x-4 text-purple-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">Perfecto para principiantes</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-purple-600">₲{discoveryKit?.price?.toLocaleString()}</span>
                <span className="text-gray-500 line-through">₲639.920</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                  Ahorra ₲240.000
                </span>
              </div>
              <button
                onClick={() => onNavigate('discovery-kit')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Descubrir Más
              </button>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                <img
                  src={discoveryKit?.image}
                  alt="Kit de Descubrimiento"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                ¡Bestseller!
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;