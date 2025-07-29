import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

// Google 字體載入 - Inter 是現代、清晰的無襯線字體
const inter = Inter({ subsets: ['latin'] })

// 網站 SEO 資訊設定
export const metadata: Metadata = {
  title: 'Eason Wu - 3D Portfolio',
  description: '以可愛 3D 角色導覽的個人作品網站 - Play & Build with Me!',
  keywords: ['portfolio', '3D', 'web development', 'interactive'],
  authors: [{ name: 'Eason Wu' }],
  viewport: 'width=device-width, initial-scale=1',
}

// 根布局組件 - 所有頁面都會使用這個布局
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        {/* 導航列 */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary-600">
                  Eason Wu
                </h1>
              </div>
              
              {/* 導航選單 */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    首頁
                  </a>
                  <a href="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    關於我
                  </a>
                  <a href="/experience" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    經歷
                  </a>
                  <a href="/projects" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    作品集
                  </a>
                  <a href="/contact" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    聯絡我
                  </a>
                </div>
              </div>
              
              {/* 手機選單按鈕 */}
              <div className="md:hidden">
                <button className="text-gray-700 hover:text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 主要內容區域 */}
        <main>
          {children}
        </main>

        {/* 頁尾 */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 Eason Wu. Made with ❤️ and React Three Fiber.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 