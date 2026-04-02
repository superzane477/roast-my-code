import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOADING_MESSAGES = [
  "Linus is typing furiously...",
  "Calibrating the sarcasm detector...",
  "Analyzing your questionable decisions...",
  "Counting the console.logs...",
  "Preparing the roast of a lifetime...",
  "Consulting the SOLID principles...",
  "Measuring code smell intensity...",
  "Loading passive-aggressive comments...",
]

interface LoadingOverlayProps {
  show: boolean
}

export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!show) {
      setMessageIndex(0)
      return
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl mb-6"
            >
              🔥
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl text-slate-300"
              >
                {LOADING_MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
