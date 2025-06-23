import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-xl font-bold">SM Parfum</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Descubre tu firma olfativa con nuestra selección curada de las mejores fragancias del mundo. Desde Ciudad del Este para todo Paraguay.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {['Inicio', 'Colecciones', 'Quiz Olfativo', 'Kit Descubrimiento', 'Sobre Nosotros'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              {['Preguntas Frecuentes', 'Guía de Fragancias', 'Envíos', 'Contacto'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">hola@smparfum.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">+595 (61) 234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">Ciudad del Este, Paraguay</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-900/30 rounded-lg">
              <p className="text-sm text-purple-200">
                <strong>Sobre Nosotros:</strong> En SM Parfum nos comprometemos a brindarte la mejor experiencia en perfumería de lujo. Cada fragancia es cuidadosamente seleccionada para garantizar autenticidad y calidad excepcional.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SM Parfum. Todos los derechos reservados. | Envíos a todo el territorio paraguayo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;