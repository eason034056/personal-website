'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Spline from '@splinetool/react-spline/next'
import type { Application } from '@splinetool/runtime'
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa'

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

// 入口頁面組件
function EntryScreen({ onEnter }: { onEnter: () => void }) {
  const [blobSize, setBlobSize] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  // 控制 blob 動畫
  useEffect(() => {
    const interval = setInterval(() => {
      setBlobSize((prev) => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // 控制打字動畫的延遲啟動
  useEffect(() => {
    // 短暫延遲後開始打字動畫
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 計算動態的 border-radius
  const getBlobRadius = () => {
    const baseRadius = 60;
    const variation = 10;
    
    const topLeft = baseRadius + Math.sin(blobSize * 0.023) * variation;
    const topRight = baseRadius + Math.cos(blobSize * 0.023) * variation;
    const bottomRight = baseRadius + Math.sin(blobSize * 0.023) * variation;
    const bottomLeft = baseRadius + Math.cos(blobSize * 0.023) * variation;
    
    return `${topLeft}% ${100-topLeft}% ${bottomRight}% ${100-bottomRight}% / ${topRight}% ${bottomRight}% ${100-bottomLeft}% ${bottomLeft}%`;
  };

  // 將滑鼠座標套用到 CSS 變數，讓光暈跟著移動
  const updateGlowPosition = (clientX: number, clientY: number) => {
    const container = buttonContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    container.style.setProperty('--x', `${x}px`);
    container.style.setProperty('--y', `${y}px`);
  };

  // 全頁面滑鼠移動也能帶動按鈕光暈
  useEffect(() => {
    const onMove = (e: MouseEvent) => updateGlowPosition(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 追蹤滑鼠在按鈕容器中的位置，並用 CSS 變數提供給光暈
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-gray-800 text-white">
      {/* 照片容器 */}
      <div 
        className="relative w-48 h-48 mb-8"
        style={{
          borderRadius: getBlobRadius(),
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden'
        }}
      >
        <img
          src="/images/profile.svg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 標題文字 */}
      <h1 className="text-4xl md:text-6xl mb-4 font-mono">Hi, I'm Eason!</h1>
      
      {/* 打字動畫 */}
      <div className="text-xl md:text-2xl mb-8 font-mono text-primary-400 min-h-[1.5em]">
        {startTyping && (
          <TypeAnimation
            sequence={[
              "I'm a Data Analyst",
              500,
              "I'm a Data Enthusiast",
              500,
              "I'm a Startup Founder",
              500,
              "I'm an Active Learner",
              500,
              "I'm a Vibe Coder",
              500
              
            ]}
            wrapper="span"
            speed={30}
            repeat={Infinity}
            cursor={true}
          />
        )}
      </div>
      
      {/* Enter 按鈕（紫色、高亮、滑鼠跟隨光暈）*/}
      <div
        ref={buttonContainerRef}
        onMouseMove={handleMouseMove}
        className="group relative mb-8"
        style={{
          // 提供初始值，避免第一次移入前沒有變數
          // @ts-ignore: CSS custom props
          ['--x' as any]: '50%',
          ['--y' as any]: '50%'
        }}
      >
        {/* 外層柔光 */}
        <div className="pointer-events-none absolute -inset-4 rounded-full blur-2xl opacity-70 transition group-hover:opacity-100"
             style={{
               background: 'conic-gradient(from 180deg at 50% 50%, rgba(147,51,234,0.35), rgba(217,70,239,0.45), rgba(147,51,234,0.35))'
             }}
        />

        <button
          onClick={onEnter}
          className="relative z-10 px-10 py-4 text-xl font-mono rounded-full text-white shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-300 active:scale-95 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 hover:shadow-[0_0_80px_rgba(217,70,239,0.75)] overflow-hidden"
        >
          {/* 滑鼠跟隨的光暈層 */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background: 'radial-gradient(140px circle at var(--x) var(--y), rgba(245, 208, 254, 0.35), rgba(192, 132, 252, 0.2) 35%, transparent 60%)'
            }}
          />
          {/* 亮邊框 */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/30" />
          View My Work
        </button>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-4">
        <a
          href="/contact"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        >
          <FaEnvelope className="w-5 h-5 text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/yu-sen-wu/"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="w-5 h-5 text-white" />
        </a>
        <a
          href="https://github.com/eason034056"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>
  );
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