import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, RefreshCw, Heart, Share2, Copy, BookOpen, Star, Download } from 'lucide-react';

const QuoteCard = ({ quote, onGenerate, isLoading, animationSpeed }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case 'slow': return 1.2;
      case 'fast': return 0.4;
      default: return 0.6;
    }
  };

  const showToastMessage = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      showToastMessage('Iqtibos nusxalandi!');
    } catch (err) {
      console.error('Failed to copy quote:', err);
      showToastMessage('Nusxalashda xatolik!');
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
        handleCopyQuote();
      }
    } else {
      handleCopyQuote();
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    showToastMessage(isLiked ? 'Yoqtirish bekor qilindi' : 'Yoqtirildi!');
  };

  const handleDownload = () => {
    // Create a canvas to generate image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    
    // Wrap text
    const words = quote.text.split(' ');
    let line = '';
    let y = 250;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 700 && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += 40;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);
    
    // Author
    ctx.font = '18px Arial';
    ctx.fillText(`- ${quote.author}`, canvas.width / 2, y + 80);
    
    // Download
    const link = document.createElement('a');
    link.download = 'iqtibos.png';
    link.href = canvas.toDataURL();
    link.click();
    
    showToastMessage('Rasm yuklab olindi!');
  };

  return (
    <>
      <motion.div
        key={quote.text}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: getAnimationDuration(), ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto"
      >
        {/* Main Card */}
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-gray-800/30 dark:via-gray-900/20 dark:to-black/10 backdrop-blur-2xl rounded-3xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-purple-500/5 to-pink-500/10 dark:from-blue-600/20 dark:via-purple-600/10 dark:to-pink-600/20 backdrop-blur-xl rounded-3xl transform -rotate-1"></div>
          
          {/* Main content */}
          <div className="relative bg-white/25 dark:bg-gray-900/40 backdrop-blur-3xl rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-white/40 dark:border-gray-700/40 hover:bg-white/30 dark:hover:bg-gray-900/50 transition-all duration-500">
            
            {/* Header with decorative elements */}
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 * getAnimationDuration(), type: "spring", stiffness: 200 }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <BookOpen className="w-8 h-8 text-blue-400 dark:text-blue-300" />
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md"></div>
                </div>
                <span className="text-white/80 dark:text-gray-300/80 font-medium">Ilhomli Iqtibos</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 * getAnimationDuration() }}
                className="flex items-center space-x-2"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </motion.div>
            </div>

            {/* Quote Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * getAnimationDuration(), type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <Quote className="w-16 h-16 text-white/60 dark:text-gray-300/60" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </motion.div>
            
            {/* Quote Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 * getAnimationDuration() }}
              className="text-center mb-10"
            >
              <p className="text-white dark:text-gray-100 text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed tracking-wide drop-shadow-2xl mb-6">
                <span className="relative">
                  "{quote.text}"
                  <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg blur-sm"></div>
                </span>
              </p>
              
              {/* Author with decorative line */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 * getAnimationDuration() }}
                className="flex items-center justify-center space-x-4"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-white/60 dark:via-gray-300/60 to-transparent w-20"></div>
                <p className="text-white/90 dark:text-gray-300/90 text-xl md:text-2xl font-medium drop-shadow-lg px-6 py-2 bg-white/10 dark:bg-gray-800/20 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                  {quote.author}
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-white/60 dark:via-gray-300/60 to-transparent w-20"></div>
              </motion.div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 * getAnimationDuration() }}
              className="flex flex-col items-center space-y-6"
            >
              {/* Main Generate Button */}
              <motion.button
                onClick={onGenerate}
                disabled={isLoading}
                className="group relative px-12 py-6 text-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[280px] overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center justify-center space-x-4">
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-7 h-7 animate-spin" />
                      <span>Yuklanmoqda...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-7 h-7 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Yangi Iqtibos</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
              </motion.button>

              {/* Secondary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  onClick={handleCopyQuote}
                  className="group p-5 rounded-2xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Nusxalash"
                >
                  <Copy className="w-7 h-7 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white transition-colors" />
                </motion.button>

                <motion.button
                  onClick={handleShareQuote}
                  className="group p-5 rounded-2xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Ulashish"
                >
                  <Share2 className="w-7 h-7 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white transition-colors" />
                </motion.button>

                <motion.button
                  onClick={handleLike}
                  className="group p-5 rounded-2xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Yoqtirish"
                >
                  <Heart className={`w-7 h-7 transition-all duration-300 ${
                    isLiked 
                      ? 'text-red-500 fill-current scale-110' 
                      : 'text-white/80 dark:text-gray-300/80 group-hover:text-red-400 dark:group-hover:text-red-400'
                  }`} />
                </motion.button>

                <motion.button
                  onClick={handleDownload}
                  className="group p-5 rounded-2xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Rasm sifatida yuklab olish"
                >
                  <Download className="w-7 h-7 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white transition-colors" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-white/30 dark:border-gray-700/30">
            <p className="text-gray-800 dark:text-white font-medium">{showToast}</p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default QuoteCard;