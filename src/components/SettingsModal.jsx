import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Image, Zap, RotateCcw, Palette, Volume2, Eye, Sparkles, 
  Heart, Clock, Type, RotateCw, Download, Trash2 
} from 'lucide-react'
import { useSettings } from '../contexts/SettingsContext'
import { backgroundImages } from '../data/quotes'

const SettingsModal = ({ isOpen, onClose, favorites, onSelectQuote }) => {
  const { settings, updateSetting, resetSettings } = useSettings()
  const [activeTab, setActiveTab] = useState('appearance')

  const tabs = [
    { id: 'appearance', label: 'Ko\'rinish', icon: Palette },
    { id: 'behavior', label: 'Xatti-harakat', icon: RotateCw },
    { id: 'favorites', label: 'Sevimlilar', icon: Heart }
  ]

  const fontSizes = [
    { value: 'small', label: 'Kichik' },
    { value: 'medium', label: 'O\'rtacha' },
    { value: 'large', label: 'Katta' }
  ]

  const textStyles = [
    { value: 'normal', label: 'Oddiy' },
    { value: 'bold', label: 'Qalin' },
    { value: 'italic', label: 'Qiyshiq' }
  ]

  const animationSpeeds = [
    { value: 'slow', label: 'Sekin' },
    { value: 'normal', label: 'O\'rtacha' },
    { value: 'fast', label: 'Tez' }
  ]

  const autoChangeIntervals = [
    { value: 5000, label: '5 soniya' },
    { value: 10000, label: '10 soniya' },
    { value: 15000, label: '15 soniya' },
    { value: 30000, label: '30 soniya' }
  ]

  const handleSelectFavorite = (quote) => {
    onSelectQuote(quote)
    onClose()
  }

  const exportFavorites = () => {
    const dataStr = JSON.stringify(favorites, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `sevimli-iqtiboslar-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

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
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 w-full max-w-5xl max-h-[90vh] overflow-hidden">
              
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-pink-600/30 p-8 border-b border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Sparkles className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                      <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                        Sozlamalar
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">
                        Ilovani o'zingizga moslang
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="p-4 rounded-3xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mt-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-white/30 dark:bg-gray-800/30 text-gray-800 dark:text-white shadow-lg'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-6 h-6" />
                        <span>{tab.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <AnimatePresence mode="wait">
                  {/* Appearance Tab */}
                  {activeTab === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Background Selection */}
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <Image className="w-8 h-8 text-purple-500" />
                          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Orqa Fon
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {backgroundImages.map((image, index) => (
                            <motion.button
                              key={image.id}
                              onClick={() => updateSetting('backgroundIndex', index)}
                              className={`relative aspect-video rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                                settings.backgroundIndex === index
                                  ? 'border-blue-500 ring-4 ring-blue-500/30 scale-105'
                                  : 'border-white/30 dark:border-gray-700/30 hover:border-blue-400 hover:scale-102'
                              }`}
                              whileHover={{ y: -4 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                              <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-sm font-semibold truncate drop-shadow-lg">
                                  {image.name}
                                </p>
                              </div>
                              {settings.backgroundIndex === index && (
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
                      </div>

                      {/* Font Size */}
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <Eye className="w-8 h-8 text-green-500" />
                          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Matn Hajmi
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {fontSizes.map((size) => (
                            <motion.button
                              key={size.value}
                              onClick={() => updateSetting('fontSize', size.value)}
                              className={`p-8 rounded-3xl font-semibold text-lg transition-all duration-300 ${
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
                      </div>

                      {/* Text Style */}
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <Type className="w-8 h-8 text-pink-500" />
                          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Matn Uslubi
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {textStyles.map((style) => (
                            <motion.button
                              key={style.value}
                              onClick={() => updateSetting('textStyle', style.value)}
                              className={`p-8 rounded-3xl font-semibold text-lg transition-all duration-300 ${
                                settings.textStyle === style.value
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                                  : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className={
                                style.value === 'bold' ? 'font-bold' :
                                style.value === 'italic' ? 'italic' : 'font-normal'
                              }>
                                {style.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Behavior Tab */}
                  {activeTab === 'behavior' && (
                    <motion.div
                      key="behavior"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Animation Speed */}
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <Zap className="w-8 h-8 text-yellow-500" />
                          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Animatsiya Tezligi
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {animationSpeeds.map((speed) => (
                            <motion.button
                              key={speed.value}
                              onClick={() => updateSetting('animationSpeed', speed.value)}
                              className={`p-8 rounded-3xl font-semibold text-lg transition-all duration-300 ${
                                settings.animationSpeed === speed.value
                                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-105'
                                  : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {speed.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Auto Change Settings */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Auto Change Toggle */}
                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <RotateCcw className="w-8 h-8 text-blue-500" />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                              Avtomatik O'zgartirish
                            </h3>
                          </div>
                          <motion.label 
                            className="flex items-center justify-between p-8 bg-white/20 dark:bg-gray-800/20 rounded-3xl border border-white/30 dark:border-gray-700/30 cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                              Avtomatik yangi iqtibos
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

                        {/* Auto Change Interval */}
                        {settings.autoChange && (
                          <div>
                            <div className="flex items-center space-x-3 mb-4">
                              <Clock className="w-8 h-8 text-green-500" />
                              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Vaqt Oralig'i
                              </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {autoChangeIntervals.map((interval) => (
                                <motion.button
                                  key={interval.value}
                                  onClick={() => updateSetting('autoChangeInterval', interval.value)}
                                  className={`p-6 rounded-2xl font-medium text-lg transition-all duration-300 ${
                                    settings.autoChangeInterval === interval.value
                                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                                      : 'bg-white/20 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-700/30'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {interval.label}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Other Settings */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Sound Effects */}
                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <Volume2 className="w-8 h-8 text-purple-500" />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                              Ovoz Effektlari
                            </h3>
                          </div>
                          <motion.label 
                            className="flex items-center justify-between p-8 bg-white/20 dark:bg-gray-800/20 rounded-3xl border border-white/30 dark:border-gray-700/30 cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
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

                        {/* Show Author */}
                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <Eye className="w-8 h-8 text-indigo-500" />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                              Muallif Ko'rsatish
                            </h3>
                          </div>
                          <motion.label 
                            className="flex items-center justify-between p-8 bg-white/20 dark:bg-gray-800/20 rounded-3xl border border-white/30 dark:border-gray-700/30 cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                              Muallif nomini ko'rsatish
                            </span>
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={settings.showAuthor}
                                onChange={(e) => updateSetting('showAuthor', e.target.checked)}
                                className="sr-only"
                              />
                              <motion.div 
                                className={`w-14 h-8 rounded-full transition-colors duration-300 ${
                                  settings.showAuthor ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                animate={{ backgroundColor: settings.showAuthor ? '#6366f1' : '#6b7280' }}
                              >
                                <motion.div 
                                  className="w-6 h-6 bg-white rounded-full shadow-lg mt-1"
                                  animate={{ x: settings.showAuthor ? 24 : 4 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              </motion.div>
                            </div>
                          </motion.label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Favorites Tab */}
                  {activeTab === 'favorites' && (
                    <motion.div
                      key="favorites"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-8 h-8 text-red-500" />
                          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Sevimli Iqtiboslar ({favorites.length})
                          </h3>
                        </div>
                        {favorites.length > 0 && (
                          <motion.button
                            onClick={exportFavorites}
                            className="flex items-center space-x-3 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="w-6 h-6" />
                            <span>Eksport</span>
                          </motion.button>
                        )}
                      </div>

                      {favorites.length === 0 ? (
                        <div className="text-center py-12">
                          <Heart className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                          <p className="text-gray-600 dark:text-gray-400 text-xl">
                            Hali sevimli iqtiboslaringiz yo'q
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 text-base mt-3">
                            Iqtibosdagi yurak tugmasini bosib sevimli qiling
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-4 max-h-96 overflow-y-auto">
                          {favorites.map((quote) => (
                            <motion.div
                              key={quote.id}
                              className="p-8 bg-white/20 dark:bg-gray-800/20 rounded-3xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 cursor-pointer"
                              whileHover={{ scale: 1.02, y: -2 }}
                              onClick={() => handleSelectFavorite(quote)}
                            >
                              <p className="text-gray-800 dark:text-white font-medium mb-3 line-clamp-2 text-lg">
                                "{quote.text}"
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-base">
                                — {quote.author}
                              </p>
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex space-x-2">
                                  {quote.tags?.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm rounded-xl"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Tanlash uchun bosing
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-600 dark:text-gray-400 text-base">
                      Barcha sozlamalar avtomatik saqlanadi
                    </p>
                    <motion.button
                      onClick={resetSettings}
                      className="flex items-center space-x-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw className="w-6 h-6" />
                      <span>Qayta tiklash</span>
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg text-lg"
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
  )
}

export default SettingsModal