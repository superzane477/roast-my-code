import { useState, useCallback } from 'react'
import type { RoastResult, Persona } from '../types'
import { buildPrompt } from '../lib/prompt'
import { callOpenAI } from '../lib/llm'
import { parseRoastResponse } from '../lib/parser'
import type { LLMError } from '../lib/llm'

type RoastState = 'idle' | 'loading' | 'success' | 'error'

export function useRoast() {
  const [state, setState] = useState<RoastState>('idle')
    const [result, setResult] = useState<RoastResult | null>(null)
    const [error, setError] = useState<LLMError | null>(null)

  const doRoast = useCallback(async (
    code: string,
    language: string,
    persona: Persona,
    apiKey: string,
    endpoint: string,
    model: string
  ) => {
    console.log('[useRoast] Starting roast...')
    console.log('[useRoast] Code length:', code?.length)
    console.log('[useRoast] Language:', language)
    console.log('[useRoast] Persona:', persona?.name)
    console.log('[useRoast] Endpoint:', endpoint)
    console.log('[useRoast] Model:', model)
    console.log('[useRoast] API Key exists:', !!apiKey)
    
    if (!code.trim()) {
      console.error('[useRoast] Error: Code is empty')
      setError({ type: 'unknown', message: 'Code cannot be empty' })
      setState('error')
      return
    }

    const lines = code.split('\n')
    if (lines.length < 3) {
      console.error('[useRoast] Error: Code too short, only', lines.length, 'lines')
      setError({ type: 'unknown', message: 'Code must be at least 3 lines long' })
      setState('error')
      return
    }
    if (lines.length > 200) {
      console.error('[useRoast] Error: Code too long, has', lines.length, 'lines')
      setError({ type: 'unknown', message: 'Code cannot exceed 200 lines' })
      setState('error')
      return
    }

    setState('loading')
    setError(null)
    
    console.log('[useRoast] Building prompt...')
    const { system, user } = buildPrompt(code, language, persona)
    console.log('[useRoast] Prompt built, calling LLM...')
    
    const response = await callOpenAI(apiKey, endpoint, model, system, user)
    console.log('[useRoast] LLM response:', response.success ? 'success' : 'failed')
    
    if (!response.success) {
      console.error('[useRoast] LLM error:', response.error)
      setError(response.error)
      setState('error')
      return
    }

    console.log('[useRoast] Parsing response...')
    const parsed = parseRoastResponse(response.data, lines.length)

    if (!parsed) {
      console.error('[useRoast] Failed to parse response')
      console.log('[useRoast] Raw response data:', response.data?.substring(0, 500))
      setError({ type: 'parse', message: 'Failed to parse AI response. Please try again.' })
      setState('error')
      return
    }

    console.log('[useRoast] Success! Annotations:', parsed.annotations?.length)
    setResult(parsed)
    setState('success')
  }, [])

  const reset = useCallback(() => {
    setState('idle')
    setResult(null)
    setError(null)
  }, [])

  return {
    state,
    result,
    error,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    doRoast,
    reset,
  }
}
