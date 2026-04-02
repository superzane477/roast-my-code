export interface LLMError {
  type: 'invalid_key' | 'rate_limit' | 'network' | 'parse' | 'unknown'
  message: string
}

export async function callOpenAI(
  apiKey: string,
  endpoint: string,
  model: string,
  system: string,
  user: string
): Promise<{ success: true; data: string } | { success: false; error: LLMError }> {
  const apiUrl = `${endpoint}/chat/completions`
  
  // Debug: Log request details
  console.log('[LLM] Making request to:', apiUrl)
  console.log('[LLM] Model:', model)
  console.log('[LLM] API Key (first 10 chars):', apiKey?.substring(0, 10) + '...')
  console.log('[LLM] System prompt length:', system?.length)
  console.log('[LLM] User prompt length:', user?.length)
  
  try {
    const requestBody = {
      model: model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.9,
      max_tokens: 4096,
    }
    
    console.log('[LLM] Request body:', JSON.stringify(requestBody, null, 2).substring(0, 500) + '...')
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    console.log('[LLM] Response status:', response.status)
    console.log('[LLM] Response OK:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[LLM] Error response:', errorText)
      
      if (response.status === 401) {
        return {
          success: false,
          error: { type: 'invalid_key', message: 'API Key is invalid. Please check your API key.' },
        }
      }
      if (response.status === 429) {
        return {
          success: false,
          error: { type: 'rate_limit', message: 'Rate limit reached. Please wait a moment and try again.' },
        }
      }
      return {
        success: false,
        error: { type: 'unknown', message: `API error: ${response.status} - ${errorText}` },
      }
    }

    const json = await response.json()
    console.log('[LLM] Response JSON keys:', Object.keys(json))
    console.log('[LLM] Choices count:', json.choices?.length)
    
    const content = json.choices?.[0]?.message?.content
    console.log('[LLM] Content length:', content?.length)

    if (!content) {
      console.error('[LLM] No content in response:', JSON.stringify(json, null, 2))
      return {
        success: false,
        error: { type: 'parse', message: 'No content in API response' },
      }
    }

    console.log('[LLM] Success! Content preview:', content.substring(0, 200) + '...')
    return { success: true, data: content }
  } catch (err) {
    console.error('[LLM] Catch error:', err)
    console.error('[LLM] Error type:', err?.constructor?.name)
    console.error('[LLM] Error message:', err instanceof Error ? err.message : String(err))
    
    if (err instanceof TypeError) {
      console.error('[LLM] TypeError details:', {
        name: err.name,
        message: err.message,
        stack: err.stack?.substring(0, 500)
      })
      return {
        success: false,
        error: { type: 'network', message: `Network error: ${err.message}. Check console for details.` },
      }
    }
    return {
      success: false,
      error: { type: 'unknown', message: err instanceof Error ? err.message : 'Unknown error occurred' },
    }
  }
}
