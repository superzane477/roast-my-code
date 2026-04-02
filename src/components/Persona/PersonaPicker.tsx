import { motion } from 'framer-motion'
import PersonaCard from './PersonaCard'
import { personas } from '../../data/personas'
import type { PersonaId } from '../../types'

interface PersonaPickerProps {
  selected: PersonaId | null
  onSelect: (id: PersonaId) => void
}

export default function PersonaPicker({ selected, onSelect }: PersonaPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <label className="text-sm text-slate-400">Choose your roaster:</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            selected={selected === persona.id}
            onClick={() => onSelect(persona.id)}
          />
        ))}
      </div>
    </motion.div>
  )
}
