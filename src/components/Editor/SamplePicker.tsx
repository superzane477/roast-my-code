import { motion } from 'framer-motion'
import { samples } from '../../data/samples'
import type { SampleCode } from '../../types'

interface SamplePickerProps {
  onSelect: (sample: SampleCode) => void
}

export default function SamplePicker({ onSelect }: SamplePickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mb-4"
    >
      <span className="text-xs text-slate-500 self-center">Try sample:</span>
      {samples.map((sample) => (
        <button
          key={sample.id}
          onClick={() => onSelect(sample)}
          className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
        >
          {sample.name}
        </button>
      ))}
    </motion.div>
  )
}
