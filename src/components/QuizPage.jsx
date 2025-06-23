import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { perfumesData, quizResults } from '../data/perfumesData';
import ProductCard from './ProductCard';

const QuizPage = ({ onProductSelect, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'gender',
      title: '¿Para quién buscas la fragancia?',
      options: [
        { value: 'mujer', label: 'Para Ella', emoji: '👩' },
        { value: 'hombre', label: 'Para Él', emoji: '👨' },
        { value: 'unisex', label: 'Unisex', emoji: '🌟' }
      ]
    },
    {
      id: 'occasion',
      title: '¿En qué ocasión la usarías más?',
      options: [
        { value: 'dia', label: 'Día a día', emoji: '☀️' },
        { value: 'noche', label: 'Ocasiones especiales', emoji: '🌙' },
        { value: 'trabajo', label: 'Trabajo/Oficina', emoji: '💼' }
      ]
    },
    {
      id: 'style',
      title: '¿Cómo te describes?',
      options: [
        { value: 'elegante', label: 'Elegante y clásico', emoji: '✨' },
        { value: 'sensual', label: 'Sensual y misterioso', emoji: '🔥' },
        { value: 'fresco', label: 'Fresco y energético', emoji: '🌊' },
        { value: 'dulce', label: 'Dulce y acogedor', emoji: '🍯' },
        { value: 'amaderado', label: 'Sofisticado y profundo', emoji: '🌲' }
      ]
    },
    {
      id: 'family',
      title: 'Basado en tu estilo, te recomendamos:',
      isRecommendation: true
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const calculateResults = () => {
    const style = answers.style;
    const result = quizResults[style];
    
    if (result) {
      const recommendedProducts = result.recommendedPerfumes
        .map(id => perfumesData.find(p => p.id === id))
        .filter(Boolean);
      
      return {
        family: result.family,
        description: result.description,
        products: recommendedProducts
      };
    }
    
    return {
      family: "Fragancias Versátiles",
      description: "Te recomendamos explorar diferentes familias",
      products: perfumesData.slice(0, 3)
    };
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Tu Firma Olfativa!
            </h1>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">
                {results.family}
              </h2>
              <p className="text-gray-700 text-lg">{results.description}</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Fragancias perfectas para ti:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductSelect={onProductSelect}
                />
              ))}
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={resetQuiz}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 mr-4"
            >
              Repetir Quiz
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explorar Todas las Fragancias
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isRecommendationStep = currentQuestion?.isRecommendation;

  if (isRecommendationStep) {
    const style = answers.style;
    const recommendation = quizResults[style];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentQuestion.title}
              </h2>
            </div>

            {recommendation && (
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  {recommendation.family}
                </h3>
                <p className="text-gray-700">{recommendation.description}</p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleFinishQuiz}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver Mis Recomendaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Paso {currentStep + 1} de {questions.length - 1}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(((currentStep + 1) / (questions.length - 1)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / (questions.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600">Selecciona la opción que mejor te describa</p>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="w-full p-6 bg-gray-50 hover:bg-purple-50 border-2 border-transparent hover:border-purple-300 rounded-xl transition-all duration-200 text-left group"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{option.emoji}</span>
                  <span className="text-lg font-medium text-gray-900 group-hover:text-purple-600">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Anterior
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-500">
                {Object.keys(answers).length > 0 && `${Object.keys(answers).length} respuesta${Object.keys(answers).length !== 1 ? 's' : ''} completada${Object.keys(answers).length !== 1 ? 's' : ''}`}
              </span>
            </div>

            <div className="w-20"> {/* Spacer for layout balance */} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;