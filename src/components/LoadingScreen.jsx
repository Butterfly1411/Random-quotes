import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles } from 'lucide-react'

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20"
    >
      {/* Loading Icon */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-20 h-20 border-4 border-white/20 border-t-white/80 rounded-full"></div>
        </motion.div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <Sparkles className="w-6 h-6" />
          <span>Yangi iqtibos yuklanmoqda...</span>
        </h3>
        <p className="text-white/70 text-lg">
          Ilhomli so'zlar tayyorlanmoqda
        </p>
      </motion.div>

      {/* Loading Dots */}
      <div className="flex space-x-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white/60 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default LoadingScreen