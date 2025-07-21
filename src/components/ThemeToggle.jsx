import React from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme, onSettingsClick }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      {/* Settings Button */}
      <motion.button
        onClick={onSettingsClick}
        className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Settings className="w-6 h-6 text-white dark:text-gray-300" />
      </motion.button>

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-white" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-400" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeToggle;