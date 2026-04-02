import type { RoastResult, Annotation, Scores, Severity } from '../types'

interface RawAnnotation {
  lineNumber: number
  severity: string
  comment: string
}

interface RawScores {
  readability: number
  performance: number
  style: number
}

interface RawRoastResult {
  annotations: RawAnnotation[]
  scores: RawScores
  overallRoast: string
}

function isValidSeverity(s: string): s is Severity {
  return ['fatal', 'error', 'warning', 'info'].includes(s)
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function parseRoastResponse(raw: string, codeLineCount: number): RoastResult | null {
  try {
    const parsed: RawRoastResult = JSON.parse(raw)

    if (!parsed.annotations || !Array.isArray(parsed.annotations)) {
      return null
    }
    if (!parsed.scores || typeof parsed.scores !== 'object') {
      return null
    }
    if (!parsed.overallRoast || typeof parsed.overallRoast !== 'string') {
      return null
    }

    const validAnnotations: Annotation[] = parsed.annotations
      .filter((a): a is RawAnnotation => 
        typeof a.lineNumber === 'number' &&
        typeof a.severity === 'string' &&
        typeof a.comment === 'string' &&
        isValidSeverity(a.severity)
      )
      .filter(a => a.lineNumber >= 1 && a.lineNumber <= codeLineCount)
      .map(a => ({
        lineNumber: a.lineNumber,
        severity: a.severity as Severity,
        comment: a.comment,
      }))

    const scores: Scores = {
      readability: clampScore(parsed.scores.readability ?? 50),
      performance: clampScore(parsed.scores.performance ?? 50),
      style: clampScore(parsed.scores.style ?? 50),
    }

    return {
      annotations: validAnnotations,
      scores,
      overallRoast: parsed.overallRoast,
    }
  } catch {
    return null
  }
}
