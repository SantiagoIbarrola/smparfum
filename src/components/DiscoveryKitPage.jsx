import React from 'react';
import { ArrowLeft, Star, Gift, Sparkles, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { perfumesData } from '../data/perfumesData';

const DiscoveryKitPage = ({ onBack }) => {
  const { addToCart } = useCart();
  const discoveryKit = perfumesData.find(p => p.id === 'discovery-kit');

  const features = [
    {
      icon: Gift,
      title: "8 Decants Premium",
      description: "2ml de cada una de las fragancias más exclusivas del mundo"
    },
    {
      icon: Sparkles,
      title: "Voucher de ₲240.000",
      description: "Úsalo en tu próxima compra de botella completa"
    },
    {
      icon: Star,
      title: "Guía Olfativa",
      description: "Aprende sobre las familias aromáticas y encuentra tu estilo"
    },
    {
      icon: CheckCircle,
      title: "Calidad Garantizada",
      description: "Fragancias 100% originales y auténticas"
    }
  ];

  const includedPerfumes = [
    "Good Girl - Carolina Herrera",
    "Sauvage - Dior", 
    "Baccarat Rouge 540 - MFK",
    "Black Opium - YSL",
    "Aventus - Creed",
    "La Vie Est Belle - Lancôme",
    "Tom Ford Oud Wood",
    "Chanel No. 5"
  ];

  const handleAddToCart = () => {
    if (discoveryKit) {
      addToCart(discoveryKit);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Volver
        </button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                ¡Bestseller!
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Kit de Descubrimiento
                <span className="block text-purple-600">SM Parfum</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                La forma perfecta de comenzar tu viaje en el mundo de la alta perfumería. 
                Descubre 8 fragancias icónicas en formato de viaje y encuentra tu nueva firma olfativa.
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">4.9 (243 reseñas)</span>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-purple-600">₲{discoveryKit?.price?.toLocaleString()}</span>
                <div className="text-right">
                  <span className="text-gray-500 line-through text-lg">₲639.920</span>
                  <span className="block text-green-600 font-semibold">Ahorra ₲240.000</span>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={discoveryKit?.image}
                alt="Kit de Descubrimiento"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
              ¡Oferta Limitada!
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ¿Qué incluye tu kit?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Included Perfumes */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Fragancias Incluidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {includedPerfumes.map((perfume, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-800 font-medium">{perfume}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Recibe tu Kit",
                description: "Te llega en 24-48 horas con envío a todo Paraguay"
              },
              {
                step: "2", 
                title: "Prueba y Descubre",
                description: "Usa cada decant durante varios días para conocer cómo evoluciona"
              },
              {
                step: "3",
                title: "Elige tu Favorita",
                description: "Usa tu voucher de ₲240.000 para comprar la botella completa que más te guste"
              }
            ].map((item, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para descubrir tu aroma perfecto?
          </h2>
          <p className="text-xl opacity-90 mb-6">
            Únete a más de 1,000 personas que ya encontraron su firma olfativa
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Comenzar Mi Descubrimiento - ₲{discoveryKit?.price?.toLocaleString()}
          </button>
          <p className="text-sm opacity-75 mt-4">
            ✓ Envío a todo Paraguay ✓ Voucher de ₲240.000 incluido ✓ Calidad garantizada
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryKitPage;