import type { Metadata, Viewport } from 'next'

// 網站 SEO 資訊設定
export const metadata: Metadata = {
  title: 'Eason Wu - 3D Portfolio',
  description: '以可愛 3D 角色導覽的個人作品網站 - Play & Build with Me!',
  keywords: ['portfolio', '3D', 'web development', 'interactive'],
  authors: [{ name: 'Eason Wu' }],
}

// Viewport 設定
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
} 