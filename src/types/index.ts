export type Severity = 'fatal' | 'error' | 'warning' | 'info'
export type PersonaId = 'strict-lead' | 'sarcastic-coworker' | 'gentle-mentor' | 'linus'

export interface Annotation {
  lineNumber: number
  severity: Severity
  comment: string
}

export interface Scores {
  readability: number
  performance: number
  style: number
}

export interface RoastResult {
  annotations: Annotation[]
  scores: Scores
  overallRoast: string
}

export interface Persona {
  id: PersonaId
  name: string
  emoji: string
  color: string
  description: string
  systemPrompt: string
}

export interface SampleCode {
  id: string
  name: string
  language: string
  code: string
}

export interface ApiConfig {
  apiKey: string
  endpoint: string
  model: string
}
