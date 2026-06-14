'use client'

import { useState, useEffect } from 'react'

/**
 * 偵測目前是否為「手機/窄螢幕」的 hook。
 *
 * 設計重點：
 * - 回傳值有三種狀態：
 *     undefined → 尚未判斷（SSR 階段或瀏覽器第一次 render 時）
 *     true      → 是手機/窄螢幕
 *     false     → 桌機/寬螢幕
 *   ⚠️ 為什麼要有 undefined？因為 server 端沒有 window，無法得知螢幕寬度。
 *   如果一開始就猜 true 或 false，server 與 client 的初次渲染結果可能不同，
 *   React 會丟出 hydration mismatch 警告。先回傳 undefined，等掛載後再決定，
 *   就能讓兩邊第一次的輸出一致。
 *
 * @param breakpoint 視為手機的最大寬度（含），預設 768px（對齊 Tailwind 的 md）
 */
export function useIsMobile(breakpoint: number = 768): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // 💡 用 matchMedia 而不是監聽 resize：
    // resize 會在每一個像素變化都觸發，浪費效能；
    // matchMedia 只在「跨越斷點」那一刻通知我們，正是我們需要的。
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

    // 掛載後立刻同步一次目前狀態
    setIsMobile(mediaQuery.matches)

    // 之後裝置旋轉、視窗縮放跨越斷點時才會被呼叫
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    // 清理監聽，避免元件卸載後還在更新 state（memory leak）
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMobile
}
