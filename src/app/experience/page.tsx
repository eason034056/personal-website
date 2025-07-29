'use client'

import { Suspense } from 'react'
import Timeline from '@/components/Timeline'

// 經歷頁面
export default function ExperiencePage() {  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      {/* 頁面標題 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          我的經歷
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          從學習到工作，每一步都是成長的軌跡
        </p>
      </div>

      {/* 時間軸組件 */}
      <Suspense fallback={<div className="text-center">載入時間軸中...</div>}>
        <Timeline />
      </Suspense>
    </div>
  )
} 