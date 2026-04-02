import { motion } from 'framer-motion'
import type { Persona } from '../../types'
import { getPersonaColor } from '../../lib/colors'

interface RoastSummaryProps {
  summary: string
  persona: Persona
}

export default function RoastSummary({ summary, persona }: RoastSummaryProps) {
  const accentColor = getPersonaColor(persona.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glow-card p-6"
      style={{ borderLeftWidth: 4, borderLeftColor: accentColor }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{persona.emoji}</span>
        <div>
          <p className="text-lg text-slate-200 italic leading-relaxed">
            "{summary}"
          </p>
          <p className="text-sm text-slate-500 mt-2">
            — {persona.name}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
