import LZString from 'lz-string'
import { toBlob } from 'html-to-image'
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
  try {
    const blob = await toBlob(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#0f0f1a',
      width: 1200,
      height: 630,
    })
    return blob
  } catch {
    return null
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
  return `https://www.reddit.com/r/verdent/submit?${params.toString()}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
