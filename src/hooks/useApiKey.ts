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
  getDefaultEndpoint,
  getDefaultModel,
} from '../lib/storage'

export function useApiConfig() {
  const [apiKey, setApiKeyState] = useState<string | null>(null)
  const [endpoint, setEndpointState] = useState<string>(getDefaultEndpoint())
  const [model, setModelState] = useState<string>(getDefaultModel())
  const [isSet, setIsSet] = useState(false)

  useEffect(() => {
    const key = getApiKey()
    setApiKeyState(key)
    setIsSet(!!key)
    setEndpointState(getEndpoint())
    setModelState(getModel())
  }, [])

  const saveApiKey = useCallback((key: string) => {
    saveApiKeyToStorage(key)
    setApiKeyState(key)
    setIsSet(true)
  }, [])

  const removeApiKey = useCallback(() => {
    clearApiKey()
    setApiKeyState(null)
    setIsSet(false)
  }, [])

  const saveEndpoint = useCallback((newEndpoint: string) => {
    saveEndpointToStorage(newEndpoint)
    setEndpointState(newEndpoint)
  }, [])

  const saveModel = useCallback((newModel: string) => {
    saveModelToStorage(newModel)
    setModelState(newModel)
  }, [])

  const checkHasApiKey = useCallback(() => {
    return hasApiKey()
  }, [])

  return {
    apiKey,
    endpoint,
    model,
    isSet,
    saveApiKey,
    removeApiKey,
    saveEndpoint,
    saveModel,
    checkHasApiKey,
  }
}
