import LZString from 'lz-string'
import html2canvas from 'html2canvas'
import type { RoastResult } from '../types'

interface SharePayload {
  result: RoastResult
  code: string
}

export function compressPayload(result: RoastResult, code: string): string {
  const payload: SharePayload = { result, code }
  const json = JSON.stringify(payload)
  return LZString.compressToEncodedURIComponent(json)
}

export function decompressPayload(payload: string): SharePayload | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(payload)
    if (!json) return null
    const parsed = JSON.parse(json)
    // backward compat: old links without code
    if (parsed && !('result' in parsed)) {
      return { result: parsed as RoastResult, code: '' }
    }
    return parsed as SharePayload
  } catch {
    return null
  }
}

export function getShareUrl(result: RoastResult, code: string): string {
  const compressed = compressPayload(result, code)
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}#/share/${compressed}`
}

export async function captureShareImage(element: HTMLElement): Promise<Blob | null> {
  // Temporarily move element on-screen so html2canvas can capture it
  const prev = {
    position: element.style.position,
    left: element.style.left,
    top: element.style.top,
    zIndex: element.style.zIndex,
  }
  element.style.position = 'fixed'
  element.style.left = '0'
  element.style.top = '0'
  element.style.zIndex = '-1'

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#0f0f1a',
      scale: 2,
      useCORS: true,
      logging: false,
      width: 1200,
      height: 630,
    })
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
  } catch {
    return null
  } finally {
    // Restore original positioning
    element.style.position = prev.position
    element.style.left = prev.left
    element.style.top = prev.top
    element.style.zIndex = prev.zIndex
  }
}

export function downloadImage(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function buildTwitterUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: text,
    url: url,
  })
  return `https://twitter.com/intent/tweet?${params.toString()}`
}

export function buildRedditUrl(title: string, url: string): string {
  const params = new URLSearchParams({
    title: title,
    url: url,
  })
  return `https://www.reddit.com/submit?${params.toString()}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
