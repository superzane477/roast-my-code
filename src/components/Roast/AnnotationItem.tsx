import { motion } from 'framer-motion'
import type { Annotation } from '../../types'
import { getSeverityColor } from '../../lib/colors'

interface AnnotationItemProps {
  annotation: Annotation
}

export default function AnnotationItem({ annotation }: AnnotationItemProps) {
  const color = getSeverityColor(annotation.severity)
  const severityLabel = annotation.severity.toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="ml-16 mr-4 mb-2"
    >
      <div
        className="p-3 rounded-lg border-l-4 text-sm"
        style={{
          borderColor: color,
          backgroundColor: `${color}15`,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-semibold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `${color}30`, color }}
          >
            {severityLabel}
          </span>
          <span className="text-xs text-slate-500">Line {annotation.lineNumber}</span>
        </div>
        <p className="text-slate-300">{annotation.comment}</p>
      </div>
    </motion.div>
  )
}
