'use client'

import { Suspense } from 'react'
import SceneAbout from '@/components/SceneAbout'

// About 頁面
export default function AboutPage() {
  return (
    <div className="scene-container">
      {/* 3D 書桌場景 */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-100">載入中...</div>}>
          <SceneAbout />
        </Suspense>
      </div>

      {/* 頁面標題和導航 */}
      <div className="absolute top-20 left-0 right-0 z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          關於我
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          點擊書桌上的物件，了解我的故事和技能
        </p>
      </div>

      {/* 個人資訊卡片 - 右側浮動 */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 max-w-sm">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-primary-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl text-white">👋</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Eason Wu</h2>
            <p className="text-gray-600">Full-Stack Developer</p>
          </div>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">🎓</span>
              <span>資訊工程系畢業</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">💻</span>
              <span>3+ 年開發經驗</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">🌟</span>
              <span>熱愛創新與學習</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">技術專長</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Three.js', 'Node.js', 'Python'].map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 互動提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm animate-pulse">
          ✨ 點擊書桌上的物件了解更多資訊
        </div>
      </div>
    </div>
  )
} 