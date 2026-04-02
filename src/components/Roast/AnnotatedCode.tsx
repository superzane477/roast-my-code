import { motion } from 'framer-motion'
import AnnotationItem from './AnnotationItem'
import type { Annotation } from '../../types'
import { getSeverityBgColor } from '../../lib/colors'

interface AnnotatedCodeProps {
  code: string
  annotations: Annotation[]
  language: string
}

export default function AnnotatedCode({ code, annotations, language }: AnnotatedCodeProps) {
  const lines = code.split('\n')
  const annotationMap = new Map<number, Annotation[]>()
  
  for (const annotation of annotations) {
    const existing = annotationMap.get(annotation.lineNumber) || []
    existing.push(annotation)
    annotationMap.set(annotation.lineNumber, existing)
  }

  return (
    <div className="glow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <span className="text-sm text-slate-400">{language}</span>
        <span className="text-xs text-slate-500">{annotations.length} issues found</span>
      </div>
      <div className="overflow-auto max-h-[500px]">
        {lines.map((line, index) => {
          const lineNum = index + 1
          const lineAnnotations = annotationMap.get(lineNum) || []
          const hasAnnotations = lineAnnotations.length > 0

          return (
            <div key={lineNum}>
              <motion.div
                initial={hasAnnotations ? { backgroundColor: 'transparent' } : false}
                animate={hasAnnotations ? { backgroundColor: getSeverityBgColor(lineAnnotations[0].severity) } : false}
                className="code-line"
              >
                <span className="line-number">{lineNum}</span>
                <pre className="line-content">{line || ' '}</pre>
              </motion.div>
              {lineAnnotations.map((annotation, idx) => (
                <AnnotationItem
                  key={`${lineNum}-${idx}`}
                  annotation={annotation}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
