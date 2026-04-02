import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { getScoreColor, getScoreGrade } from '../../lib/colors'

interface ScoreGaugeProps {
  label: string
  value: number
}

export default function ScoreGauge({ label, value }: ScoreGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const startValueRef = useRef(0)
  const color = getScoreColor(value)
  const grade = getScoreGrade(value)

  useEffect(() => {
    const duration = 1000
    const start = startValueRef.current
    const end = value
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * easeOut)
      
      setDisplayValue(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        startValueRef.current = end
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayValue / 100) * circumference

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20">
        <svg className="transform -rotate-90 w-20 h-20">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{displayValue}</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-xl font-bold" style={{ color }}>
          {grade}
        </p>
      </div>
    </div>
  )
}
