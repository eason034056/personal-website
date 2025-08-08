import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eason Wu - Portfolio',
  description: 'Eason Wu - Portfolio',
  keywords: ['portfolio', 'web development', 'interactive', 'easonwu.com', 'data science', 'machine learning', 'artificial intelligence', 'web3', 'AML', 'KYC'],
  authors: [{ name: 'Eason Wu' }],
  icons: {
    icon: '/images/icon.svg',
    shortcut: '/images/icon.svg',
    apple: '/images/icon.svg',
  },
  openGraph: {
    title: 'Eason Wu - Portfolio',
    description: 'Eason Wu - Portfolio',
    url: 'https://www.easonwu.com',
    siteName: 'Eason Wu Portfolio',
    images: [
      {
        url: '/images/icon.svg',  // 您需要添加這張圖片
        width: 630,
        height: 630,
        alt: 'Eason Wu Portfolio Preview'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eason Wu - Portfolio',
    description: 'Eason Wu - Portfolio',
    images: ['/images/icon.svg'],  // 使用相同的圖片
  },
}