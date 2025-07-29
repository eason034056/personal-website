'use client'

import { Suspense } from 'react'
import ContactForm from '@/components/ContactForm'

// 聯絡頁面
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      {/* 頁面標題 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          聯絡我
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          有任何問題或合作機會嗎？我很樂意與你交流！
        </p>
      </div>

      {/* 聯絡表單 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側：聯絡資訊 */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">聯絡方式</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">eason.wu@example.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">LinkedIn</h3>
                    <p className="text-gray-600">linkedin.com/in/eason-wu</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🐙</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">GitHub</h3>
                    <p className="text-gray-600">github.com/eason-wu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 可用時間 */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">回覆時間</h2>
              <p className="text-gray-600 leading-relaxed">
                我通常會在 24-48 小時內回覆訊息。如果是緊急事項，
                請在訊息中註明，我會盡快回覆。
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">
                  ✅ 目前可以接受新的專案合作
                </p>
              </div>
            </div>
          </div>

          {/* 右側：聯絡表單 */}
          <div>
            <Suspense fallback={<div>載入表單中...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 