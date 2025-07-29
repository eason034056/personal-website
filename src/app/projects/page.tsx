'use client'

import { Suspense } from 'react'
import ProjectGrid from '@/components/ProjectGrid'

// 作品集頁面
export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      {/* 頁面標題 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          我的作品集
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          探索我的創意專案，從網頁應用到 3D 互動體驗
        </p>
      </div>

      {/* 專案網格 */}
      <Suspense fallback={<div className="text-center">載入專案中...</div>}>
        <ProjectGrid />
      </Suspense>
    </div>
  )
} 