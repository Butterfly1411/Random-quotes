import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Zap, RotateCcw, Palette, Volume2, Eye, Sparkles } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, settings, updateSetting, images, currentBgIndex }) => {
  const backgroundNames = [
    'Moviy Osmon', 'Bulutlar', 'Yorug\'lik', 'Yomg\'ir', 'Deraza', 
    'Tog\'lar', 'Turkiya', 'Qish', 'Bulutli', 'Tog\' Manzarasi',
    'Koinot', 'Matn Fonida', 'Yomg\'irli Yo\'l'
  ];

  const fontSizes = [
    { value: 'small', label: 'Kichik', class: 'text-xl md:text-2xl lg:text-3xl' },
    { value: 'medium', label: 'O\'rtacha', class: 'text-2xl md:text-4xl lg:text-5xl' },
    { value: 'large', label: 'Katta', class: 'text-3xl md:text-5xl lg:text-6xl' }
  ];

  const textStyles = [
    { value: 'normal', label: 'Oddiy', class: 'font-light' },
    { value: 'bold', label: 'Qalin', class: 'font-bold' },
    { value: 'italic', label: 'Qiyshiq', class: 'font-light italic' }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 w-full max-w-4xl max-h-[90vh] overflow-hidden">
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-pink-600/30 p-8 border-b border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                      <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-lg"></div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Sozlamalar
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Ilovani o'zingizga moslang
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="p-3 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[70vh] space-y-10">
                
                {/* Background Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="relative">
                      <Image className="w-6 h-6 text-purple-500" />
                      <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Orqa Fon Tanlash
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => updateSetting('backgroundIndex', index)}
                        className={`relative aspect-video rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                          currentBgIndex === index
                            ? 'border-blue-500 ring-4 ring-blue-500/30 scale-105'
                            : 'border-white/30 dark:border-gray-700/30 hover:border-blue-400 hover:scale-102'
                        }`}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={image}
                          alt={backgroundNames[index]}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-semibold truncate drop-shadow-lg">
                            {backgroundNames[index]}
                          </p>
                        </div>
                        {currentBgIndex === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <div className="w-3 h-3 bg-white rounded-full" />
                            </div>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Font Size */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="relative">
                      <Eye className="w-6 h-6 text-green-500" />
                      <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Matn Hajmi
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {fontSizes.map((size) => (
                      <motion.button
                        key={size.value}
                        onClick={() => updateSetting('fontSize', size.value)}
                        className={`p-6 rounded-2xl font-semibold transition-all duration-300 ${
                          settings.fontSize === size.value
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105'
                            : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Text Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="relative">
                      <Palette className="w-6 h-6 text-pink-500" />
                      <div className="absolute -inset-1 bg-pink-500/20 rounded-full blur-sm"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Matn Uslubi
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {textStyles.map((style) => (
                      <motion.button
                        key={style.value}
                        onClick={() => updateSetting('textStyle', style.value)}
                        className={`p-6 rounded-2xl font-semibold transition-all duration-300 ${
                          settings.textStyle === style.value
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                            : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className={style.class}>{style.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Animation Speed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="relative">
                      <Zap className="w-6 h-6 text-yellow-500" />
                      <div className="absolute -inset-1 bg-yellow-500/20 rounded-full blur-sm"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Animatsiya Tezligi
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {['slow', 'normal', 'fast'].map((speed) => (
                      <motion.button
                        key={speed}
                        onClick={() => updateSetting('animationSpeed', speed)}
                        className={`p-6 rounded-2xl font-semibold transition-all duration-300 ${
                          settings.animationSpeed === speed
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-105'
                            : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {speed === 'slow' ? 'Sekin' : speed === 'normal' ? 'O\'rtacha' : 'Tez'}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Auto Change & Sound */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {/* Auto Change */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="relative">
                        <RotateCcw className="w-6 h-6 text-blue-500" />
                        <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Avtomatik O'zgartirish
                      </h3>
                    </div>
                    <motion.label 
                      className="flex items-center justify-between p-6 bg-white/20 dark:bg-gray-800/20 rounded-2xl border border-white/30 dark:border-gray-700/30 cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        Har 10 soniyada yangi iqtibos
                      </span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.autoChange}
                          onChange={(e) => updateSetting('autoChange', e.target.checked)}
                          className="sr-only"
                        />
                        <motion.div 
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.autoChange ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          animate={{ backgroundColor: settings.autoChange ? '#3b82f6' : '#6b7280' }}
                        >
                          <motion.div 
                            className="w-6 h-6 bg-white rounded-full shadow-lg mt-1"
                            animate={{ x: settings.autoChange ? 24 : 4 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.div>
                      </div>
                    </motion.label>
                  </div>

                  {/* Sound Effects */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="relative">
                        <Volume2 className="w-6 h-6 text-purple-500" />
                        <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Ovoz Effektlari
                      </h3>
                    </div>
                    <motion.label 
                      className="flex items-center justify-between p-6 bg-white/20 dark:bg-gray-800/20 rounded-2xl border border-white/30 dark:border-gray-700/30 cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        Tugma bosilganda ovoz
                      </span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.soundEffects}
                          onChange={(e) => updateSetting('soundEffects', e.target.checked)}
                          className="sr-only"
                        />
                        <motion.div 
                          className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                            settings.soundEffects ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          animate={{ backgroundColor: settings.soundEffects ? '#8b5cf6' : '#6b7280' }}
                        >
                          <motion.div 
                            className="w-6 h-6 bg-white rounded-full shadow-lg mt-1"
                            animate={{ x: settings.soundEffects ? 24 : 4 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.div>
                      </div>
                    </motion.label>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Barcha sozlamalar avtomatik saqlanadi
                  </p>
                  <motion.button
                    onClick={onClose}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tayyor
                  </motion.button>
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