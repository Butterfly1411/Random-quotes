import React from 'react'
import { motion } from 'framer-motion'
import { Settings, Sun, Moon, BookOpen, Sparkles } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Header = ({ onSettingsClick }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 p-6"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center space-x-4"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-lg animate-pulse"></div>
            <div className="relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-full p-3 border border-white/30 dark:border-gray-700/30">
              <BookOpen className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              Ilhomli Iqtiboslar
            </h1>
            <p className="text-white/80 text-sm drop-shadow-md">
              Hayotingizni o'zgartiruvchi so'zlar
            </p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="group relative p-4 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title={theme === 'light' ? 'Qorong\'u rejim' : 'Yorug\' rejim'}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              {theme === 'light' ? (
                <Moon className="w-6 h-6 text-white/90 group-hover:text-white transition-colors duration-300" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              )}
            </div>
          </motion.button>

          {/* Settings Button */}
          <motion.button
            onClick={onSettingsClick}
            className="group relative p-4 rounded-2xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title="Sozlamalar"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Settings className="w-6 h-6 text-white/90 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header