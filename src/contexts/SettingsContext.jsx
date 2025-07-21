import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

const DEFAULT_SETTINGS = {
  backgroundIndex: 0,
  autoChange: false,
  autoChangeInterval: 10000,
  animationSpeed: 'normal',
  fontSize: 'medium',
  textStyle: 'normal',
  soundEffects: true,
  showAuthor: true,
  language: 'uz'
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quotes-settings')
      if (saved) {
        try {
          const parsedSettings = JSON.parse(saved)
          return { ...DEFAULT_SETTINGS, ...parsedSettings }
        } catch (error) {
          console.warn('Failed to parse settings:', error)
          return DEFAULT_SETTINGS
        }
      }
    }
    return DEFAULT_SETTINGS
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quotes-settings', JSON.stringify(settings))
    }
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}