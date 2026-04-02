import { useState, useEffect, useCallback } from 'react'
import {
  getApiKey,
  setApiKey as saveApiKeyToStorage,
  clearApiKey,
  hasApiKey,
  getEndpoint,
  setEndpoint as saveEndpointToStorage,
  getModel,
  setModel as saveModelToStorage,
} from '../lib/storage'

export function useApiConfig() {
  const [apiKey, setApiKeyState] = useState<string | null>(null)
  const [endpoint, setEndpointState] = useState<string>('https://api.openai.com/v1')
  const [model, setModelState] = useState<string>('gpt-4o-mini')
  const [isSet, setIsSet] = useState(false)

  // Initialize from localStorage
  useEffect(() => {
    const key = getApiKey()
    setApiKeyState(key)
    setIsSet(!!key)
    setEndpointState(getEndpoint())
    setModelState(getModel())
  }, [])

  const saveApiConfig = useCallback((key: string, endpointUrl: string, modelValue: string) => {
    saveApiKeyToStorage(key)
    saveEndpointToStorage(endpointUrl)
    saveModelToStorage(modelValue)
    setApiKeyState(key)
    setEndpointState(endpointUrl)
    setModelState(modelValue)
    setIsSet(true)
  }, [])

  const clearApiConfig = useCallback(() => {
    clearApiKey()
    setApiKeyState(null)
    setEndpointState('https://api.openai.com/v1')
    setModelState('gpt-4o-mini')
    setIsSet(false)
  }, [])

  const checkHasApiKey = useCallback(() => {
    return hasApiKey()
  }, [])

  return {
    apiKey,
    endpoint,
    model,
    isSet,
    saveApiConfig,
    clearApiConfig,
    checkHasApiKey,
  }
}
