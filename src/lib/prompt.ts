import type { Persona } from '../types'

export function buildPrompt(code: string, language: string, persona: Persona): { system: string, user: string } {
  const system = `${persona.systemPrompt}

You MUST respond with ONLY a valid JSON object in this exact format, with no additional text:
{
  "annotations": [
    {"lineNumber": number, "severity": "fatal|error|warning|info", "comment": "string"}
  ],
  "scores": {
    "readability": number (0-100),
    "performance": number (0-100),
    "style": number (0-100)
  },
  "overallRoast": "string (1-2 sentence verdict in your persona's voice)"
}

Rules:
- lineNumber must be a valid line number in the provided code (1-indexed)
- severity must be one of: "fatal", "error", "warning", "info"
- scores must be integers between 0 and 100
- Provide 3-10 annotations focusing on the most important issues
- Be specific - cite exact line numbers and explain WHY something is problematic
- Maintain your persona throughout all comments and the overallRoast`

  const user = `Review this ${language} code:

\`\`\`${language}
${code}
\`\`\`

Provide your roast in the required JSON format. Remember to stay in character!`

  return { system, user }
}
