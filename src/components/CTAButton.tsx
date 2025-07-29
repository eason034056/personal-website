'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// CTA (Call to Action) 按鈕組件
export default function CTAButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  // 處理按鈕點擊
  const handleClick = () => {
    setIsClicked(true)
    
    // 播放點擊音效（稍後實作）
    // playClickSound()
    
    // 短暫延遲後導航到 About 頁面
    setTimeout(() => {
      router.push('/about')
    }, 300)
  }

  return (
    <div className="relative">
      {/* 主按鈕 */}
      <button
        className={`
          cta-button relative overflow-hidden
          ${isHovered ? 'scale-110' : 'scale-100'}
          ${isClicked ? 'scale-95' : ''}
          transition-transform duration-300
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        disabled={isClicked}
      >
        {/* 按鈕文字 */}
        <span className="relative z-10 font-bold text-lg">
          🎮 開始探索
        </span>
        
        {/* 背景光暈效果 */}
        <div 
          className={`
            absolute inset-0 rounded-full opacity-30
            ${isHovered ? 'animate-ping' : ''}
          `}
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)'
          }}
        />
        
        {/* 閃光效果 */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/50 transform -translate-y-1/2 animate-pulse" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/50 transform -translate-x-1/2 animate-pulse" />
          </div>
        )}
      </button>

      {/* 提示文字 */}
      <p className="text-white/70 text-sm mt-4 animate-fade-in delay-1000">
        點擊按鈕，讓我們的 3D 角色帶你認識我！
      </p>

      {/* 粒子效果（稍後可以加強） */}
      {isHovered && (
        <div className="absolute -inset-4 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary-300 rounded-full animate-ping opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1000}ms`,
                animationDuration: `${1000 + Math.random() * 1000}ms`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
} 