import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Copy, Share2, Download, Heart, Shuffle } from 'lucide-react'
import { useSettings } from '../contexts/SettingsContext'
import Toast from './Toast'

const Controls = ({ onNewQuote, isLoading, currentQuote, isFavorite, onToggleFavorite }) => {
  const { settings } = useSettings()
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCopyQuote = async () => {
    try {
      const text = settings.showAuthor 
        ? `"${currentQuote.text}" - ${currentQuote.author}`
        : `"${currentQuote.text}"`
      
      await navigator.clipboard.writeText(text)
      showToast('Iqtibos nusxalandi!', 'success')
      
      if (settings.soundEffects) {
        playSuccessSound()
      }
    } catch (err) {
      console.error('Failed to copy quote:', err)
      showToast('Nusxalashda xatolik!', 'error')
    }
  }

  const handleShareQuote = async () => {
    const text = settings.showAuthor 
      ? `"${currentQuote.text}" - ${currentQuote.author}`
      : `"${currentQuote.text}"`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ilhomli Iqtibos',
          text: text,
          url: window.location.href
        })
        showToast('Iqtibos ulashildi!', 'success')
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyQuote()
        }
      }
    } else {
      handleCopyQuote()
    }
  }

  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1200
    canvas.height = 800
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(0.5, '#764ba2')
    gradient.addColorStop(1, '#f093fb')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add some decorative elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.beginPath()
    ctx.arc(200, 150, 100, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(1000, 650, 80, 0, Math.PI * 2)
    ctx.fill()
    
    // Quote text
    ctx.fillStyle = 'white'
    ctx.font = 'bold 36px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 10
    
    // Wrap text
    const words = currentQuote.text.split(' ')
    let line = ''
    let y = 300
    const maxWidth = 1000
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y)
        line = words[n] + ' '
        y += 50
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, canvas.width / 2, y)
    
    // Author
    if (settings.showAuthor) {
      ctx.font = '24px Arial, sans-serif'
      ctx.fillText(`— ${currentQuote.author}`, canvas.width / 2, y + 80)
    }
    
    // Logo/Watermark
    ctx.font = '18px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.fillText('Ilhomli Iqtiboslar', canvas.width / 2, canvas.height - 50)
    
    // Download
    const link = document.createElement('a')
    link.download = `iqtibos-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
    
    showToast('Rasm yuklab olindi!', 'success')
  }

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const getAnimationDuration = () => {
    switch (settings.animationSpeed) {
      case 'slow': return 1.0
      case 'fast': return 0.3
      default: return 0.5
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: getAnimationDuration() }}
        className="relative z-10 p-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Action Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={onNewQuote}
              disabled={isLoading}
              className="group relative px-16 py-8 text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[400px] overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-600 dark:via-purple-600 dark:to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <span className="relative z-10 flex items-center justify-center space-x-4">
                {isLoading ? (
                  <>
                    <RefreshCw className="w-10 h-10 animate-spin" />
                    <span>Yuklanmoqda...</span>
                  </>
                ) : (
                  <>
                    <Shuffle className="w-10 h-10 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Yangi Iqtibos</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl"></div>
            </motion.button>
          </div>

          {/* Secondary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: getAnimationDuration() }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {/* Copy Button */}
            <motion.button
              onClick={handleCopyQuote}
              className="group p-6 rounded-3xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Nusxalash"
            >
              <Copy className="w-8 h-8 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white transition-colors" />
            </motion.button>

            {/* Share Button */}
            <motion.button
              onClick={handleShareQuote}
              className="group p-6 rounded-3xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Ulashish"
            >
              <Share2 className="w-8 h-8 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white transition-colors" />
            </motion.button>

            {/* Favorite Button */}
            <motion.button
              onClick={onToggleFavorite}
              className="group p-6 rounded-3xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
            >
              <Heart className={`w-8 h-8 transition-all duration-300 ${
                isFavorite 
                  ? 'text-red-500 fill-current scale-110' 
                  : 'text-white/80 dark:text-gray-300/80 group-hover:text-red-400 dark:group-hover:text-red-400'
              }`} />
            </motion.button>

            {/* Download Button */}
            <motion.button
              onClick={handleDownloadImage}
              className="group p-6 rounded-3xl bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Rasm sifatida yuklab olish"
            >
              <Download className="w-8 h-8 text-white/80 dark:text-gray-300/80 group-hover:text-white dark:group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default Controls