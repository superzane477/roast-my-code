import { forwardRef } from 'react'
import type { RoastResult } from '../../types'
import { getScoreColor, getScoreGrade } from '../../lib/colors'

interface ShareCardProps {
  result: RoastResult
  code: string
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ result, code }, ref) => {
  const topAnnotations = result.annotations
    .sort((a, b) => {
      const severityOrder = { fatal: 0, error: 1, warning: 2, info: 3 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })
    .slice(0, 3)

  return (
    <div
      ref={ref}
      className="fixed left-[-9999px] top-[-9999px] w-[1200px] h-[630px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Roast My Code
          </h1>
          <div className="text-5xl">🔥</div>
        </div>

        {/* Scores */}
        <div className="flex gap-6 mb-6">
          {(['readability', 'performance', 'style'] as const).map((key) => (
            <div key={key} className="flex-1 bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-400 capitalize mb-1">{key}</p>
              <p className="text-4xl font-bold" style={{ color: getScoreColor(result.scores[key]) }}>
                {result.scores[key]}
              </p>
              <p className="text-lg font-semibold text-slate-300">
                {getScoreGrade(result.scores[key])}
              </p>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="flex-1 bg-slate-800/50 rounded-xl p-4 mb-6 overflow-hidden">
          <p className="text-sm text-slate-400 mb-2">Code:</p>
          <pre className="text-sm text-slate-200 font-mono whitespace-pre-wrap line-clamp-8">
            {code.split('\n').slice(0, 10).join('\n')}
            {code.split('\n').length > 10 && '\n...'}
          </pre>
        </div>

        {/* Top issues */}
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Top Issues:</p>
          {topAnnotations.map((annotation, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 bg-slate-800/50 rounded-lg p-3"
            >
              <span className="text-sm text-slate-400">L{annotation.lineNumber}:</span>
              <p className="text-sm text-slate-200 line-clamp-1">{annotation.comment}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-700">
          <p className="text-center text-sm text-slate-400">
            roast-my-code.verdent.app
          </p>
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'

export default ShareCard
