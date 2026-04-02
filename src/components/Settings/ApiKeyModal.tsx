import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ApiKeyModalProps {
  open: boolean
  onClose: () => void
  onSave: (key: string, endpoint: string, model: string) => void
  onClear: () => void
  hasKey: boolean
  initialEndpoint?: string
  initialModel?: string
}

export default function ApiKeyModal({ 
  open, 
  onClose, 
  onSave, 
  onClear, 
  hasKey,
  initialEndpoint = 'https://api.openai.com/v1',
  initialModel = 'gpt-4o-mini'
}: ApiKeyModalProps) {
  const [key, setKey] = useState('')
  const [endpoint, setEndpoint] = useState(initialEndpoint)
  const [model, setModel] = useState(initialModel)
  const [showKey, setShowKey] = useState(false)

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim(), endpoint.trim() || 'https://api.openai.com/v1', model.trim() || 'gpt-4o-mini')
      setKey('')
      onClose()
    }
  }

  const handleClear = () => {
    onClear()
    setKey('')
    setEndpoint('https://api.openai.com/v1')
    setModel('gpt-4o-mini')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="glow-card p-6 mx-4">
              <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
              <p className="text-slate-400 text-sm mb-4">
                Your API key is stored locally in your browser and never sent to any server except your configured endpoint.
              </p>
              
              {/* API Key */}
              <div className="relative mb-4">
                <label className="block text-sm text-slate-400 mb-2">API Key</label>
                <input
                  type={showKey ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-white"
                >
                  {showKey ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* API Endpoint */}
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">API Endpoint</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="https://api.openai.com/v1"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Compatible with OpenAI, Ollama, vLLM, Azure OpenAI, etc.
                </p>
              </div>

              {/* Model */}
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">Model</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="gpt-4o-mini"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Examples: gpt-4o-mini, llama3.2, deepseek-chat
                </p>
              </div>

              <div className="flex gap-3">
                {hasKey && (
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!key.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
