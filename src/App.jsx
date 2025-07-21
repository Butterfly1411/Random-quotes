import React from 'react'
import QuotesApp from './components/QuotesApp'
import { ThemeProvider } from './contexts/ThemeContext'
import { SettingsProvider } from './contexts/SettingsContext'

const App = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <QuotesApp />
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default App