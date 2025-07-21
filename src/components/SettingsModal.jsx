import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Zap, RotateCcw } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, settings, updateSetting, images, currentBgIndex }) => {
  const backgroundNames = [
    'Moviy Osmon', 'Bulutlar', 'Yorug\'lik', 'Yomg\'ir', 'Deraza', 
    'Tog\'lar', 'Turkiya', 'Qish', 'Bulutli', 'Tog\' Manzarasi',
    'Koinot', 'Matn Fonida', 'Yomg\'irli Yo\'l'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 w-full max-w-2xl max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-500" />
                  Sozlamalar
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200/20 dark:hover:bg-gray-700/20 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Background Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Orqa Fon Tanlash
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => updateSetting('backgroundIndex', index)}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          currentBgIndex === index
                            ? 'border-blue-500 ring-2 ring-blue-500/30'
                            : 'border-white/20 dark:border-gray-700/20 hover:border-blue-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={image}
                          alt={backgroundNames[index]}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className="text-white text-xs font-medium truncate">
                            {backgroundNames[index]}
                          </p>
                        </div>
                        {currentBgIndex === index && (
                          <div className="absolute top-2 right-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Animation Speed */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    Animatsiya Tezligi
                  </h3>
                  <div className="flex gap-2">
                    {['slow', 'normal', 'fast'].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => updateSetting('animationSpeed', speed)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          settings.animationSpeed === speed
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-gray-200/40 dark:hover:bg-gray-700/40'
                        }`}
                      >
                        {speed === 'slow' ? 'Sekin' : speed === 'normal' ? 'O\'rtacha' : 'Tez'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto Change */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Avtomatik O'zgartirish
                  </h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={settings.autoChange}
                        onChange={(e) => updateSetting('autoChange', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        settings.autoChange ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          settings.autoChange ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`} />
                      </div>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Har 10 soniyada yangi iqtibos
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;