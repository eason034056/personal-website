'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// 表單資料介面
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// 表單驗證規則
const schema = yup.object({
  name: yup.string().required('請輸入您的姓名').min(2, '姓名至少需要 2 個字元'),
  email: yup.string().required('請輸入電子信箱').email('請輸入有效的電子信箱'),
  subject: yup.string().required('請輸入主旨').min(5, '主旨至少需要 5 個字元'),
  message: yup.string().required('請輸入訊息內容').min(10, '訊息至少需要 10 個字元')
})

// 聯絡表單組件
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [characterAnimation, setCharacterAnimation] = useState<'idle' | 'typing' | 'wave'>('idle')

  // 使用 react-hook-form 處理表單
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema)
  })

  // 表單提交處理
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setCharacterAnimation('typing')
    
    try {
      // 模擬 API 呼叫 - 實際專案中會使用 EmailJS 或後端 API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // TODO: 實際發送郵件
      // await emailjs.send('service_id', 'template_id', data, 'public_key')
      
      setSubmitStatus('success')
      setCharacterAnimation('wave')
      reset()
      
      // 3 秒後重置狀態
      setTimeout(() => {
        setSubmitStatus('idle')
        setCharacterAnimation('idle')
      }, 3000)
      
    } catch (error) {
      setSubmitStatus('error')
      setCharacterAnimation('idle')
      
      // 3 秒後重置錯誤狀態
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 處理輸入時的角色動畫
  const handleInputFocus = () => {
    if (!isSubmitting) {
      setCharacterAnimation('typing')
    }
  }

  const handleInputBlur = () => {
    if (!isSubmitting) {
      setCharacterAnimation('idle')
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      {/* 表單標題 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">發送訊息</h2>
        <p className="text-gray-600">我很期待聽到您的想法！</p>
        
        {/* 角色狀態指示器 */}
        <div className="mt-4 flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
            characterAnimation === 'idle' ? 'bg-gray-200' :
            characterAnimation === 'typing' ? 'bg-yellow-200' :
            'bg-green-200'
          }`}>
            <span className="text-2xl">
              {characterAnimation === 'idle' ? '😊' :
               characterAnimation === 'typing' ? '⌨️' :
               '👋'}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {characterAnimation === 'idle' ? '我在等待您的訊息' :
           characterAnimation === 'typing' ? '我在認真聽您說話' :
           '謝謝您的訊息！'}
        </p>
      </div>

      {/* 成功/錯誤訊息 */}
      {submitStatus === 'success' && (
        <div className="success-message mb-6">
          <p className="font-semibold">訊息發送成功！</p>
          <p className="text-sm mt-1">我會盡快回覆您的訊息。</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message mb-6">
          <p className="font-semibold">發送失敗</p>
          <p className="text-sm mt-1">請稍後再試，或直接發送郵件給我。</p>
        </div>
      )}

      {/* 聯絡表單 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 姓名欄位 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            姓名 *
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
            placeholder="請輸入您的姓名"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* 電子信箱欄位 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            電子信箱 *
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            placeholder="your.email@example.com"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 主旨欄位 */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            主旨 *
          </label>
          <input
            {...register('subject')}
            id="subject"
            type="text"
            className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
            placeholder="想要討論的主題"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* 訊息內容欄位 */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            訊息內容 *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            className={`form-input resize-none ${errors.message ? 'border-red-500' : ''}`}
            placeholder="請詳細描述您想要討論的內容..."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* 提交按鈕 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              發送中...
            </span>
          ) : (
            '🚀 發送訊息'
          )}
        </button>
      </form>

      {/* 表單說明 */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>您的個人資料僅用於回覆您的訊息，不會用於其他用途。</p>
      </div>

      {/* TODO-LLM:ContactForm:Add character animation based on form interaction */}
    </div>
  )
} 