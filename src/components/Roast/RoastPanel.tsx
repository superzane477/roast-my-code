import { motion } from 'framer-motion'
import AnnotatedCode from './AnnotatedCode'
import RoastSummary from './RoastSummary'
import ScoreBoard from '../Score/ScoreBoard'
import SharePanel from '../Share/SharePanel'
import type { RoastResult, Persona } from '../../types'

interface RoastPanelProps {
  result: RoastResult
  persona: Persona
  code: string
  language: string
  onReset: () => void
}

export default function RoastPanel({ result, persona, code, language, onReset }: RoastPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>{persona.emoji}</span>
          <span>{persona.name}'s Verdict</span>
        </h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Annotated code */}
        <div className="lg:col-span-2">
          <AnnotatedCode
            code={code}
            annotations={result.annotations}
            language={language}
          />
        </div>

        {/* Score panel */}
        <div className="space-y-4">
          <ScoreBoard scores={result.scores} />
        </div>
      </div>

      {/* Summary */}
      <RoastSummary summary={result.overallRoast} persona={persona} />

      {/* Share panel */}
      <SharePanel result={result} />
    </motion.div>
  )
}
