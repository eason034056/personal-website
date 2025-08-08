'use client'

import { Suspense } from 'react'
import ContactForm from '@/components/ContactForm'
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div
      className="min-h-screen py-20"
      style={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)'
      }}
    >
      {/* Page Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Contact Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side: Contact Information */}
          <div className="w-full">
            <div className="w-full bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h2>
              
              <div className="space-y-6">
                {/* Email 區塊 */}
                <div className="flex items-center">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mr-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <FaEnvelope className="w-full h-full text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600 truncate">yu-senwu2026@u.northwestern.edu</p>
                  </div>
                </div>

                {/* LinkedIn 區塊 */}
                <div className="flex items-center">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mr-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <FaLinkedinIn className="w-full h-full text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/yu-sen-wu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors block truncate"
                    >
                      https://www.linkedin.com/in/yu-sen-wu/
                    </a>
                  </div>
                </div>

                {/* GitHub 區塊 */}
                <div className="flex items-center">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mr-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <FaGithub className="w-full h-full text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800">GitHub</h3>
                    <a 
                      href="https://github.com/eason034056"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors block truncate"
                    >
                      https://github.com/eason034056
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:max-w-2xl">
            <Suspense fallback={
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-500 border-t-gray-800"></div>
              </div>
            }>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 