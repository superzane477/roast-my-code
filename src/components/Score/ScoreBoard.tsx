import { motion } from 'framer-motion'
import ScoreGauge from './ScoreGauge'
import type { Scores } from '../../types'

interface ScoreBoardProps {
  scores: Scores
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  const scoreItems = [
    { key: 'readability', label: 'Readability', value: scores.readability },
    { key: 'performance', label: 'Performance', value: scores.performance },
    { key: 'style', label: 'Style', value: scores.style },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glow-card p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Scores</h3>
      <div className="space-y-6">
        {scoreItems.map((item) => (
          <ScoreGauge
            key={item.key}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </motion.div>
  )
}
