'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Form data interface
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Form validation schema
const schema = yup.object({
  name: yup.string().required('Please enter your name').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Please enter your email').email('Please enter a valid email'),
  subject: yup.string().required('Please enter a subject').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Please enter your message').min(10, 'Message must be at least 10 characters')
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [characterAnimation, setCharacterAnimation] = useState<'idle' | 'typing' | 'wave'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setCharacterAnimation('typing')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      setSubmitStatus('success')
      setCharacterAnimation('wave')
      reset()

      setTimeout(() => {
        setSubmitStatus('idle')
        setCharacterAnimation('idle')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setCharacterAnimation('idle')

      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-4xl mx-auto">
      {/* Form Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Message</h2>
        <p className="text-gray-600">I'm excited to hear your thoughts!</p>
        
        {/* Character Status Indicator */}
        <div className="mt-4 flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            characterAnimation === 'idle' ? 'bg-gradient-to-br from-gray-100 to-gray-200' :
            characterAnimation === 'typing' ? 'bg-gradient-to-br from-gray-200 to-gray-300' :
            'bg-gradient-to-br from-gray-300 to-gray-400'
          }`}>
            <span className="text-2xl">
              {characterAnimation === 'idle' ? '😊' :
               characterAnimation === 'typing' ? '⌨️' :
               '👋'}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {characterAnimation === 'idle' ? 'Waiting for your message' :
           characterAnimation === 'typing' ? 'Listening carefully...' :
           'Thank you for your message!'}
        </p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Message sent successfully!</p>
          <p className="text-sm mt-1 text-gray-600">I'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border border-gray-300">
          <p className="font-semibold text-gray-800">Failed to send</p>
          <p className="text-sm mt-1 text-gray-600">Please try again or email me directly.</p>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name and Email Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              className={`form-input w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
              placeholder="Enter your name"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className={`form-input w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
              placeholder="your.email@example.com"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            {...register('subject')}
            id="subject"
            type="text"
            className={`form-input w-full rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            className={`form-input w-full rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:min-w-[200px] md:ml-auto py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Sending...
            </span>
          ) : (
            '🚀 Send Message'
          )}
        </button>
      </form>

      {/* Form Note */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your personal information will only be used to respond to your message.</p>
      </div>
    </div>
  )
} 