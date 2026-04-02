import { useState, useCallback } from 'react'
import type { RoastResult } from '../types'
import {
  getShareUrl,
  captureShareImage,
  downloadImage,
  buildTwitterUrl,
  buildRedditUrl,
  copyToClipboard,
} from '../lib/share'

export function useShare() {
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const generateShareUrl = useCallback((result: RoastResult, code: string) => {
    const url = getShareUrl(result, code)
    setShareUrl(url)
    return url
  }, [])

  const captureAndDownload = useCallback(async (
    element: HTMLElement,
    filename: string = 'roast-my-code.png'
  ) => {
    setIsCapturing(true)
    try {
      const blob = await captureShareImage(element)
      if (blob) {
        downloadImage(blob, filename)
        return true
      }
      return false
    } finally {
      setIsCapturing(false)
    }
  }, [])

  const shareToTwitter = useCallback((result: RoastResult, code: string) => {
    const url = generateShareUrl(result, code)
    const text = `Check out this code roast! ${result.overallRoast.slice(0, 50)}...`
    window.open(buildTwitterUrl(text, url), '_blank', 'noopener,noreferrer')
  }, [generateShareUrl])

  const shareToReddit = useCallback((result: RoastResult, code: string) => {
    const url = generateShareUrl(result, code)
    window.open(buildRedditUrl('My code got roasted!', url), '_blank', 'noopener,noreferrer')
  }, [generateShareUrl])

  const copyShareUrl = useCallback(async (result: RoastResult, code: string): Promise<boolean> => {
    const url = generateShareUrl(result, code)
    return copyToClipboard(url)
  }, [generateShareUrl])

  return {
    shareUrl,
    isCapturing,
    generateShareUrl,
    captureAndDownload,
    shareToTwitter,
    shareToReddit,
    copyShareUrl,
  }
}
