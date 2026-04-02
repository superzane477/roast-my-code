import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ApiKeyModal from './components/Settings/ApiKeyModal'
import CodeEditor from './components/Editor/CodeEditor'
import LanguageSelect from './components/Editor/LanguageSelect'
import SamplePicker from './components/Editor/SamplePicker'
import PersonaPicker from './components/Persona/PersonaPicker'
import RoastButton from './components/Roast/RoastButton'
import LoadingOverlay from './components/Roast/LoadingOverlay'
import RoastPanel from './components/Roast/RoastPanel'
import { useApiConfig } from './hooks/useApiConfig'
import { useRoast } from './hooks/useRoast'
import { detectLanguage } from './hooks/useCodeDetection'
import { decompressPayload } from './lib/share'
import { getPersona } from './data/personas'
import { mockRoast } from './data/mockRoast'
import type { PersonaId, SampleCode, RoastResult } from './types'

type View = 'input' | 'result' | 'shared'

export default function App() {
  // State
  const [view, setView] = useState<View>('input')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [selectedPersona, setSelectedPersona] = useState<PersonaId | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sharedResult, setSharedResult] = useState<RoastResult | null>(null)
  const [sharedCode, setSharedCode] = useState<string>('')

  // Hooks
  const { 
    apiKey, 
    endpoint, 
    model, 
    isSet: hasApiKey, 
    saveApiConfig, 
    clearApiConfig 
  } = useApiConfig()
  const { state: roastState, result: roastResult, error: roastError, doRoast, reset: resetRoast } = useRoast()

  // Handle shared result from URL
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/share/')) {
      const payload = hash.slice(8)
      const shared = decompressPayload(payload)
      if (shared) {
        setSharedResult(shared.result)
        setSharedCode(shared.code)
        setView('shared')
      }
    }
  }, [])

  // Auto-detect language when code changes
  useEffect(() => {
    if (code.length > 50) {
      const detected = detectLanguage(code)
      if (detected !== 'plaintext') {
        setLanguage(detected)
      }
    }
  }, [code])

  // Handlers
  const handleSampleSelect = (sample: SampleCode) => {
    setCode(sample.code)
    setLanguage(sample.language)
  }

  const canRoast = code.trim().length > 0 && selectedPersona !== null && hasApiKey

  const getDisabledReason = () => {
    if (!hasApiKey) return 'Set your API key first'
    if (!selectedPersona) return 'Select a roaster persona'
    if (!code.trim()) return 'Paste some code to roast'
    return undefined
  }

  const handleRoast = useCallback(async () => {
    if (!canRoast || !selectedPersona || !apiKey) return

    const persona = getPersona(selectedPersona)
    if (!persona) return

    await doRoast(code, language, persona, apiKey, endpoint, model)
  }, [canRoast, selectedPersona, apiKey, code, language, doRoast, endpoint, model])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (view === 'input' && canRoast) {
          handleRoast()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [view, canRoast, handleRoast])

  // Handle successful roast
  useEffect(() => {
    if (roastState === 'success' && roastResult) {
      setView('result')
    }
  }, [roastState, roastResult])

  const handleReset = () => {
    resetRoast()
    setView('input')
  }

  const handleNewRoast = () => {
    resetRoast()
    setView('input')
    window.location.hash = ''
  }

  const handleSaveApiConfig = (key: string, ep: string, mdl: string) => {
    saveApiConfig(key, ep, mdl)
  }

  const handleClearApiConfig = () => {
    clearApiConfig()
  }

  // Render shared result
  if (view === 'shared' && sharedResult) {
    const persona = getPersona('linus')!
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSettingsClick={() => setSettingsOpen(true)} hasApiKey={hasApiKey} />
        <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-slate-400 text-center">
              Someone shared a roast with you!
            </p>
          </motion.div>
          <RoastPanel
            result={sharedResult}
            persona={persona}
            code={sharedCode || '// Shared roast - original code not included'}
            language="javascript"
            onReset={handleNewRoast}
          />
        </main>
        <Footer />
        <ApiKeyModal
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onSave={handleSaveApiConfig}
          onClear={handleClearApiConfig}
          hasKey={hasApiKey}
          initialEndpoint={endpoint}
          initialModel={model}
        />
      </div>
    )
  }

  // Render result view
  if (view === 'result' && roastResult && selectedPersona) {
    const persona = getPersona(selectedPersona)!
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSettingsClick={() => setSettingsOpen(true)} hasApiKey={hasApiKey} />
        <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
          <RoastPanel
            result={roastResult}
            persona={persona}
            code={code}
            language={language}
            onReset={handleReset}
          />
        </main>
        <Footer />
        <ApiKeyModal
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onSave={handleSaveApiConfig}
          onClear={handleClearApiConfig}
          hasKey={hasApiKey}
          initialEndpoint={endpoint}
          initialModel={model}
        />
      </div>
    )
  }

  // Render input view
  return (
    <div className="min-h-screen flex flex-col">
      <Header onSettingsClick={() => setSettingsOpen(true)} hasApiKey={hasApiKey} />
      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Sample picker */}
          <SamplePicker onSelect={handleSampleSelect} />

          {/* Code editor */}
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
          />

          {/* Language selector */}
          <div className="flex items-center justify-between">
            <LanguageSelect value={language} onChange={setLanguage} />
            <span className="text-xs text-slate-500">
              {code.split('\n').length} lines
            </span>
          </div>

          {/* Persona picker */}
          <PersonaPicker
            selected={selectedPersona}
            onSelect={setSelectedPersona}
          />

          {/* Error message */}
          <AnimatePresence>
            {roastState === 'error' && roastError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg bg-red-500/20 border border-red-500/30"
              >
                <p className="text-red-400 text-sm">{roastError.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Roast button */}
          <div className="pt-4">
            <RoastButton
              onClick={handleRoast}
              disabled={!canRoast}
              disabledReason={getDisabledReason()}
            />
          </div>

          {/* Demo for users without API key */}
          {!hasApiKey && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center pt-4"
            >
              <p className="text-slate-400 text-sm mb-2">
                No API key? No problem! Set one up in settings to roast your own code.
              </p>
              <button
                onClick={() => {
                  setSharedResult(mockRoast)
                  setView('shared')
                }}
                className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2"
              >
                See an example roast
              </button>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />

      {/* Modals and overlays */}
      <ApiKeyModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveApiConfig}
        onClear={handleClearApiConfig}
        hasKey={hasApiKey}
        initialEndpoint={endpoint}
        initialModel={model}
      />

      <LoadingOverlay show={roastState === 'loading'} />
    </div>
  )
}
