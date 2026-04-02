import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  return (
    <div className="glow-card overflow-hidden">
      <Editor
        height="400px"
        language={language}
        value={value}
        onChange={(v) => onChange(v || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Monaco', monospace",
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          folding: false,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}
