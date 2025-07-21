import React from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme, onSettingsClick }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-4">
      {/* Settings Button */}
      <motion.button
        onClick={onSettingsClick}
        className="p-4 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Settings className="w-7 h-7 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
      </motion.button>

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className="p-4 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {theme === 'light' ? (
          <Moon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors duration-300" />
        ) : (
          <Sun className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeToggle;