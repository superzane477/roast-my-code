export default function Footer() {
  return (
    <footer className="px-6 py-4 border-t border-orange-900/20 mt-auto">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-4 text-sm text-slate-500">
        <span>Built with</span>
        <span className="text-red-400">AI</span>
        <span>by</span>
        <a 
          href="https://www.verdent.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-400 hover:text-orange-300 transition-colors"
        >
          Verdent
        </a>
      </div>
    </footer>
  )
}
