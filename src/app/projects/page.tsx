'use client'

import { Suspense } from 'react'
import Spline from '@splinetool/react-spline/next'
import type { Application } from '@splinetool/runtime'
import { useIsMobile } from '@/hooks/useIsMobile'
import ProjectGrid from '@/components/ProjectGrid'

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
  const isMobile = useIsMobile()

  // 尚未判斷裝置（SSR / 首次渲染）時先顯示 Loading，
  // ⚠️ 這一步很重要：若先預設渲染 Spline，手機上會「先下載 3D 資產再切走」，
  // 等於沒省到效能。先停在 Loading，確定不是手機才掛載 Spline。
  if (isMobile === undefined) {
    return <LoadingScreen />
  }

  // 手機：卡片列表用自然文件流（min-h-screen），和 about 一樣會撐高頁面，
  // window 才會真正捲動，全域 navbar 的「捲動變白色毛玻璃」才會生效。
  if (isMobile) {
    return <ProjectGrid />
  }

  // 桌機：3D 場景要固定滿版、不捲動，所以才用 h-screen 包住。
  return (
    <div className="w-full h-screen">
      <SplineScene />
    </div>
  )
} 