import { motion } from 'framer-motion'
import type { Persona } from '../../types'
import { getPersonaColor } from '../../lib/colors'

interface PersonaCardProps {
  persona: Persona
  selected: boolean
  onClick: () => void
}

export default function PersonaCard({ persona, selected, onClick }: PersonaCardProps) {
  const accentColor = getPersonaColor(persona.id)

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-4 rounded-xl text-left transition-all ${
        selected
          ? 'ring-2 bg-white/5'
          : 'bg-slate-800/50 hover:bg-slate-800'
      }`}
      style={{
        borderColor: selected ? accentColor : 'transparent',
        borderWidth: selected ? 2 : 0,
      }}
    >
      {selected && (
        <motion.div
          layoutId="persona-glow"
          className="absolute inset-0 rounded-xl opacity-20"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="relative">
        <div className="text-2xl mb-2">{persona.emoji}</div>
        <div className="text-sm font-medium text-white">{persona.name}</div>
        <div className="text-xs text-slate-400 mt-1 line-clamp-2">{persona.description}</div>
      </div>
    </motion.button>
  )
}
