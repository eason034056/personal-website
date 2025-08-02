'use client'

import { Suspense } from 'react'
import Spline from '@splinetool/react-spline/next'
import type { Application } from '@splinetool/runtime'

// 載入中的組件
function LoadingScreen() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: 'rgb(215, 215, 215)' }}
    >
      <div className="text-center">
        {/* 這是一個自訂的 loading spinner，顏色改成深灰色以搭配背景 */}
        <div
          className="loading-spinner w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full mx-auto mb-4"
          style={{
            borderColor: '#555', // 深灰色
            borderTopColor: 'transparent'
          }}
        ></div>
      </div>
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

// 作品集頁面
export default function ProjectsPage() {
  return (
    <div className="w-full h-screen">
      <SplineScene />
    </div>
  )
} 