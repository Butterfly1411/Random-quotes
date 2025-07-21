import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle
  }

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    warning: 'from-yellow-500 to-orange-500'
  }

  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-8 py-5 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 flex items-center space-x-4 min-w-[350px]`}>
        <Icon className="w-8 h-8 flex-shrink-0" />
        <p className="font-medium flex-1 text-lg">{message}</p>
        <motion.button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Toast