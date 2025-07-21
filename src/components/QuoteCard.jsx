import React from 'react';
import { motion } from 'framer-motion';
import { Quote, RefreshCw, Heart, Share2, Copy } from 'lucide-react';

const QuoteCard = ({ quote, onGenerate, isLoading, animationSpeed }) => {
  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case 'slow': return 1.2;
      case 'fast': return 0.4;
      default: return 0.6;
    }
  };

  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy quote:', err);
    }
  };

  const handleShareQuote = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ilhomli Iqtibos',
          text: `"${quote.text}" - ${quote.author}`,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyQuote();
    }
  };

  return (
    <motion.div
      key={quote.text}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: getAnimationDuration(), ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/15 dark:bg-gray-900/25 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-900/30 transition-all duration-300">
        <div className="flex flex-col items-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 * getAnimationDuration(), type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <Quote className="w-12 h-12 text-white/70 dark:text-gray-300/70" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg" />
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 * getAnimationDuration() }}
            className="text-white dark:text-gray-100 text-xl md:text-3xl lg:text-4xl text-center font-light leading-relaxed tracking-wide drop-shadow-lg"
          >
            "{quote.text}"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 * getAnimationDuration() }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/60 dark:to-gray-300/60"></div>
            <p className="text-white/90 dark:text-gray-300/90 text-lg md:text-xl font-medium drop-shadow-md">
              {quote.author}
            </p>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 * getAnimationDuration() }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Main Generate Button */}
            <motion.button
              onClick={onGenerate}
              disabled={isLoading}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Yuklanmoqda...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    <span>Yangi Iqtibos</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-700 dark:to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            {/* Secondary Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleCopyQuote}
                className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Nusxalash"
              >
                <Copy className="w-5 h-5 text-white/80 dark:text-gray-300/80" />
              </motion.button>

              <motion.button
                onClick={handleShareQuote}
                className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Ulashish"
              >
                <Share2 className="w-5 h-5 text-white/80 dark:text-gray-300/80" />
              </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

              <motion.button
                className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Yoqtirish"
              >
                <Heart className="w-5 h-5 text-white/80 dark:text-gray-300/80" />
              </motion.button>
            </div>
          </motion.div>
export default QuoteCard;