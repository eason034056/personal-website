'use client'

import { Suspense } from 'react'
import Spline from '@splinetool/react-spline/next'
import type { Application } from '@splinetool/runtime'
import CTAButton from '@/components/CTAButton'

// 載入中的組件
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="text-center">
        <div className="loading-spinner w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-primary-700 text-lg">載入 3D 場景中...</p>
      </div>
    </div>
  )
}

// Landing Page 主組件
export default function Home() {
  // 當 Spline 場景載入完成時觸發
  const onLoad = (spline: Application) => {
    // 這裡可以存取 spline 實例
    console.log('Spline scene loaded');
  }

  return (
    <div className="scene-container relative w-full h-screen">
      {/* 3D 場景容器 - 佔滿整個視窗 */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<LoadingScreen />}>
          {/* Spline 3D 場景 */}
          <Spline
            scene="https://prod.spline.design/tMgwENlDcYzl-amS/scene.splinecode"
            className="w-full h-full"
            onLoad={onLoad}
          />
        </Suspense>
      </div>

      {/* 歡迎文字和 CTA 按鈕 - 浮在 3D 場景上方 */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        {/* 主標題 */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
          Hello, I'm <span className="text-primary-300">Eason</span>
        </h1>
        
        {/* 副標題 */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
          一個喜歡用程式碼創造有趣體驗的開發者
          <br />
          <span className="text-primary-200">歡迎來到我的 3D 作品世界！</span>
        </p>

        {/* CTA 按鈕 - 點擊後會進入 About 頁面 */}
        <div className="pointer-events-auto">
          <CTAButton />
        </div>

        {/* 捲動提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-float">
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2">探索更多</p>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
} 