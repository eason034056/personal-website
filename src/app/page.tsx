'use client'

import { Suspense, useState } from 'react'
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

// 入口頁面組件
function EntryScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* 標題文字 */}
      <h1 className="text-4xl md:text-6xl mb-8 font-mono">Hi, I'm Eason!</h1>
      
      {/* Enter 按鈕 */}
      <button
        onClick={onEnter}
        className="px-8 py-3 text-xl font-mono bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300 cursor-pointer"
      >
        Enter
      </button>
    </div>
  )
}

// 主要的 Spline 場景組件
function SplineScene() {
  const onLoad = (spline: Application) => {
    console.log('Spline scene loaded');
  }

  const onError = () => {
    console.error('Spline scene failed to load');
  }

  return (
    <div className="scene-container relative w-full h-screen">
      {/* 3D 場景容器 */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<LoadingScreen />}>
          <Spline
            scene="https://prod.spline.design/tMgwENlDcYzl-amS/scene.splinecode"
            className="w-full h-full"
            onLoad={onLoad}
            onError={onError}
          />
        </Suspense>
      </div>

    </div>
  )
}

// Landing Page 主組件
export default function Home() {
  const [showSpline, setShowSpline] = useState(false)

  // 處理 Enter 按鈕點擊
  const handleEnter = () => {
    setShowSpline(true)
  }

  return (
    <div className="w-full h-screen">
      {showSpline ? (
        <SplineScene />
      ) : (
        <EntryScreen onEnter={handleEnter} />
      )}
    </div>
  )
} 