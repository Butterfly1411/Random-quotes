import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useSettings } from '../contexts/SettingsContext'
import { quotes, backgroundImages } from '../data/quotes'
import Header from './Header'
import QuoteDisplay from './QuoteDisplay'
import Controls from './Controls'
import SettingsModal from './SettingsModal'
import BackgroundOverlay from './BackgroundOverlay'
import LoadingScreen from './LoadingScreen'

const QuotesApp = () => {
  const { theme } = useTheme()
  const { settings } = useSettings()
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quotes-favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Auto change quotes
  useEffect(() => {
    if (settings.autoChange) {
      const interval = setInterval(() => {
        getRandomQuote()
      }, settings.autoChangeInterval)

      return () => clearInterval(interval)
    }
  }, [settings.autoChange, settings.autoChangeInterval])

  // Save favorites to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quotes-favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const getRandomQuote = useCallback(async () => {
    setIsLoading(true)
    
    // Simulate loading for better UX
    const loadingTime = settings.animationSpeed === 'fast' ? 300 : 
                       settings.animationSpeed === 'slow' ? 1000 : 600
    
    await new Promise(resolve => setTimeout(resolve, loadingTime))
    
    const availableQuotes = quotes.filter(quote => quote.id !== currentQuote.id)
    const randomIndex = Math.floor(Math.random() * availableQuotes.length)
    const newQuote = availableQuotes[randomIndex]
    
    setCurrentQuote(newQuote)
    setIsLoading(false)

    // Play sound effect if enabled
    if (settings.soundEffects) {
      playClickSound()
    }
  }, [currentQuote.id, settings.animationSpeed, settings.soundEffects])

  const playClickSound = () => {
    // Create a simple click sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const toggleFavorite = (quote) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === quote.id)
      if (isFavorite) {
        return prev.filter(fav => fav.id !== quote.id)
      } else {
        return [...prev, quote]
      }
    })
  }

  const isFavorite = (quote) => {
    return favorites.some(fav => fav.id === quote.id)
  }

  const currentBackground = backgroundImages[settings.backgroundIndex]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        key={currentBackground.id}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: settings.animationSpeed === 'fast' ? 0.8 : 
                   settings.animationSpeed === 'slow' ? 2.0 : 1.4,
          ease: "easeOut" 
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentBackground.url})` }}
      />
      
      {/* Background Overlay */}
      <BackgroundOverlay />
      
      {/* Header */}
      <Header onSettingsClick={() => setShowSettings(true)} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen key="loading" />
              ) : (
                <QuoteDisplay
                  key={currentQuote.id}
                  quote={currentQuote}
                  isFavorite={isFavorite(currentQuote)}
                  onToggleFavorite={() => toggleFavorite(currentQuote)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <Controls 
          onNewQuote={getRandomQuote}
          isLoading={isLoading}
          currentQuote={currentQuote}
          isFavorite={isFavorite(currentQuote)}
          onToggleFavorite={() => toggleFavorite(currentQuote)}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        favorites={favorites}
        onSelectQuote={setCurrentQuote}
      />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
      >
        <p className="text-white/60 dark:text-gray-400/60 text-sm text-center drop-shadow-lg">
          Ilhomli iqtiboslar to'plami • {quotes.length} ta iqtibos
        </p>
      </motion.footer>
    </div>
  )
}

export default QuotesApp