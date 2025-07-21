import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Heart, Tag } from 'lucide-react'
import { useSettings } from '../contexts/SettingsContext'

const QuoteDisplay = ({ quote, isFavorite, onToggleFavorite }) => {
  const { settings } = useSettings()

  const getAnimationDuration = () => {
    switch (settings.animationSpeed) {
      case 'slow': return 1.2
      case 'fast': return 0.4
      default: return 0.7
    }
  }

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small': return 'text-xl md:text-2xl lg:text-3xl'
      case 'large': return 'text-3xl md:text-5xl lg:text-6xl'
      default: return 'text-2xl md:text-4xl lg:text-5xl'
    }
  }

  const getTextStyleClass = () => {
    switch (settings.textStyle) {
      case 'bold': return 'font-bold'
      case 'italic': return 'font-light italic'
      default: return 'font-light'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        duration: getAnimationDuration(), 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      className="relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-3xl rounded-3xl transform rotate-1 scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-purple-500/5 to-pink-500/10 backdrop-blur-2xl rounded-3xl transform -rotate-1 scale-105"></div>
      
      {/* Main Card */}
      <div className="relative bg-white/20 dark:bg-gray-900/30 backdrop-blur-3xl rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/25 dark:hover:bg-gray-900/40 transition-all duration-500">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * getAnimationDuration() }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Quote className="w-10 h-10 text-blue-400 dark:text-blue-300" />
              <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-white/80 dark:text-gray-300/80 font-medium text-xl">
              Ilhomli Iqtibos
            </span>
          </div>
          
          {/* Favorite Button */}
          <motion.button
            onClick={onToggleFavorite}
            className="group p-4 rounded-2xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          >
            <Heart 
              className={`w-8 h-8 transition-all duration-300 ${
                isFavorite 
                  ? 'text-red-500 fill-current scale-110' 
                  : 'text-white/70 dark:text-gray-300/70 group-hover:text-red-400 dark:group-hover:text-red-400'
              }`} 
            />
          </motion.button>
        </motion.div>

        {/* Quote Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 * getAnimationDuration() }}
          className="text-center mb-10"
        >
          <div className="relative mb-8">
            <p className={`text-white dark:text-gray-100 ${getFontSizeClass()} ${getTextStyleClass()} leading-relaxed tracking-wide drop-shadow-2xl`}>
              <span className="relative">
                "{quote.text}"
                <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg blur-lg"></div>
              </span>
            </p>
          </div>
          
          {/* Author */}
          {settings.showAuthor && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 * getAnimationDuration() }}
              className="flex items-center justify-center space-x-4"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-white/50 dark:via-gray-300/50 to-transparent w-16"></div>
              <div className="px-8 py-4 bg-white/15 dark:bg-gray-800/25 rounded-full backdrop-blur-sm border border-white/25 dark:border-gray-700/25">
                <p className="text-white/90 dark:text-gray-300/90 text-xl md:text-2xl font-medium drop-shadow-lg">
                  {quote.author}
                </p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/50 dark:via-gray-300/50 to-transparent w-16"></div>
            </motion.div>
          )}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 * getAnimationDuration() }}
          className="flex items-center justify-center space-x-2 flex-wrap gap-2"
        >
          <Tag className="w-5 h-5 text-white/60" />
          {quote.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/10 dark:bg-gray-800/20 rounded-full text-white/70 dark:text-gray-300/70 text-base backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-yellow-500/10 rounded-full blur-xl"></div>
      </div>
    </motion.div>
  )
}

export default QuoteDisplay