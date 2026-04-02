import type { Severity } from '../types'

export function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case 'fatal': return '#f87171'
    case 'error': return '#fb923c'
    case 'warning': return '#fbbf24'
    case 'info': return '#60a5fa'
  }
}

export function getSeverityBgColor(severity: Severity): string {
  switch (severity) {
    case 'fatal': return 'rgba(248, 113, 113, 0.15)'
    case 'error': return 'rgba(251, 146, 60, 0.15)'
    case 'warning': return 'rgba(251, 191, 36, 0.15)'
    case 'info': return 'rgba(96, 165, 250, 0.15)'
  }
}

export function getScoreColor(score: number): string {
  if (score >= 70) return '#4ade80'
  if (score >= 40) return '#fbbf24'
  return '#f87171'
}

export function getScoreGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export function getPersonaColor(personaId: string): string {
  switch (personaId) {
    case 'strict-lead': return '#3b82f6'
    case 'sarcastic-coworker': return '#a855f7'
    case 'gentle-mentor': return '#22c55e'
    case 'linus': return '#ef4444'
    default: return '#64748b'
  }
}
