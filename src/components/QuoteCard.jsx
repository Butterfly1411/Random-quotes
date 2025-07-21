import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const QuoteCard = ({ quote, onGenerate, isLoading }) => {
  return (
    <motion.div
      key={quote.text}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-700/20">
        <div className="flex flex-col items-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Quote className="w-12 h-12 text-white/60 dark:text-gray-300/60" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white dark:text-gray-100 text-xl md:text-3xl lg:text-4xl text-center font-light leading-relaxed tracking-wide"
          >
            "{quote.text}"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50 dark:to-gray-300/50"></div>
            <p className="text-white/80 dark:text-gray-300/80 text-lg md:text-xl font-medium">
              {quote.author}
            </p>
          </motion.div>
          
          <motion.button
            onClick={onGenerate}
            disabled={isLoading}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Yuklanmoqda...</span>
                </>
              ) : (
                <span>Yangi Iqtibos</span>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-700 dark:to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteCard;