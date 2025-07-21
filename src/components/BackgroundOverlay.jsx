import React from 'react'
import { motion } from 'framer-motion'

const BackgroundOverlay = () => {
  return (
    <>
      {/* Main gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 dark:from-black/70 dark:via-black/50 dark:to-black/70"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 dark:bg-white/5 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
    </>
  )
}

export default BackgroundOverlay