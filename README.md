# Roast My Code 🔥

🔥 **AI-Powered code roaster** with hilarious (but accurate) code review. 

Paste your code, choose a roaster persona, and get line-by-line annotated feedback with severity-based scoring. Great for sharing your viral-worthy content for social media!

Built with React,19 + TypeScript + Vite 8 + Tailwind CSS 4 + Monaco Editor + Framer Motion + html2canvas

## Features

- **4 AI Personas**: Strict Tech Lead, Sarcastic Coworker, Gentle Mentor, Linus Torvalds
- **Line-by-line annotations** with severity levels (fatal, error, warning, info)
- **Scoring system**: Readability, performance, style
- **Shareable results**: PNG download, link sharing, Twitter/Reddit

## Quick Start
```bash
npm install
npm run dev
```
Open http://localhost:5173 to try it out!

## Custom Endpoints

Support for any OpenAI-compatible API:
- **OpenAI**: `https://api.openai.com/v1`
- **Ollama**: `http://localhost:11434/v1`
- **vLLM**: `http://localhost:8000/v1`
- **Groq**: `https://api.groq.com/openai/v1`
- **DeepSeek**: `https://api.deepseek.com/v1`
- **Together AI**: `https://api.together.xyz/v1`
- **Azure OpenAI**: `https://YOUR_RESOURCE.openai.azure.com/v1`

## Installation

```bash
git clone https://github.com/superzane477/roast-my-code.git
cd roast-my-code
npm install
```

## Configuration

1. Click the gear icon in the top right
2. Enter your OpenAI API key (required)
3. Optionally change the endpoint URL and model name
4. Paste your code and select a persona
5. Click **Roast My Code**

## Keyboard Shortcuts

- `Cmd/Ctrl + Enter` - Submit roast

## Examples

See [EXAMPLES.md](.//EXAMPLES.md) for sample code to try.

## Development

```bash
cd roast-my-code
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Monaco Editor
- Framer Motion
- html2canvas

- LZ-String

## License

MIT
