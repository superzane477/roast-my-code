const API_KEY_STORAGE_KEY = 'roast-my-code-api-key'
const ENDPOINT_STORAGE_KEY = 'roast-my-code-endpoint'
const MODEL_STORAGE_KEY = 'roast-my-code-model'

const DEFAULT_ENDPOINT = 'https://api.openai.com/v1'
const DEFAULT_MODEL = 'gpt-4o-mini'

export function getApiKey(): string | null {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY)
  } catch {
    return null
  }
}

export function setApiKey(key: string): void {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key)
  } catch {
    console.error('Failed to save API key')
  }
}

export function clearApiKey(): void {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY)
  } catch {
    console.error('Failed to clear API key')
  }
}

export function hasApiKey(): boolean {
  return !!getApiKey()
}

export function getEndpoint(): string {
  try {
    return localStorage.getItem(ENDPOINT_STORAGE_KEY) || DEFAULT_ENDPOINT
  } catch {
    return DEFAULT_ENDPOINT
  }
}

export function setEndpoint(endpoint: string): void {
  try {
    localStorage.setItem(ENDPOINT_STORAGE_KEY, endpoint)
  } catch {
    console.error('Failed to save endpoint')
  }
}

export function getModel(): string {
  try {
    return localStorage.getItem(MODEL_STORAGE_KEY) || DEFAULT_MODEL
  } catch {
    return DEFAULT_MODEL
  }
}

export function setModel(model: string): void {
  try {
    localStorage.setItem(MODEL_STORAGE_KEY, model)
  } catch {
    console.error('Failed to save model')
  }
}

export function getDefaultEndpoint(): string {
  return DEFAULT_ENDPOINT
}

export function getDefaultModel(): string {
  return DEFAULT_MODEL
}
