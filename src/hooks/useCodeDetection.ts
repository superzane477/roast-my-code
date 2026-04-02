const LANGUAGE_PATTERNS: Record<string, RegExp[]> = {
  typescript: [
    /^import\s+type\s+/m,
    /:\s*(string|number|boolean|any)\s*[;=)]/,
    /interface\s+\w+\s*\{/,
    /type\s+\w+\s*=/,
    /<\w+>/,
  ],
  javascript: [
    /^import\s+.*from\s+['"]/m,
    /^const\s+.*=\s*require\(/m,
    /export\s+(default\s+)?(function|class|const)/,
    /=>\s*\{/,
    /async\s+function/,
    /\.then\(/,
  ],
  python: [
    /^def\s+\w+\s*\(/m,
    /^class\s+\w+(\(|:)/m,
    /^import\s+\w+/m,
    /^from\s+\w+\s+import/m,
    /:\s*->\s*\w+:/,
    /if\s+__name__\s*==\s*['"]__main__['"]/,
  ],
  rust: [
    /^fn\s+\w+/m,
    /^let\s+mut\s+/m,
    /impl\s+\w+/,
    /pub\s+(fn|struct|enum)/,
    /use\s+std::/,
  ],
  go: [
    /^func\s+(\(\w+\s+\*?\w+\)\s*)?\w+/m,
    /^package\s+\w+/m,
    /import\s*\(/,
    /fmt\.(Print|Sprintf)/,
    /:=\s*/,
  ],
  java: [
    /^public\s+class\s+/m,
    /^private\s+\w+\s+\w+\s*;/m,
    /System\.out\.print/,
    /@Override/,
    /new\s+\w+\(\)/,
  ],
  css: [
    /^\s*\.\w+\s*\{/m,
    /^\s*#\w+\s*\{/m,
    /@media\s+/,
    /display:\s*(flex|grid|block)/,
  ],
  html: [
    /<(!DOCTYPE|html|head|body|div|span|p|a)/i,
    /<\/\w+>/,
    /class="[^"]*"/,
    /id="[^"]*"/,
  ],
}

export function detectLanguage(code: string): string {
  const scores: Record<string, number> = {}

  for (const [lang, patterns] of Object.entries(LANGUAGE_PATTERNS)) {
    scores[lang] = 0
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        scores[lang] += 1
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const top = sorted[0]

  if (top && top[1] > 0) {
    return top[0]
  }

  return 'plaintext'
}
