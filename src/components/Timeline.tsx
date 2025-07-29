'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// 時間軸項目介面
interface TimelineItem {
  id: string
  year: string
  title: string
  company: string
  description: string
  skills: string[]
  type: 'work' | 'education' | 'project'
}

// 時間軸資料
const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2024',
    title: '全端工程師',
    company: '科技新創公司',
    description: '負責開發創新的 3D 網頁應用，結合 React Three Fiber 打造沉浸式用戶體驗。參與產品規劃和架構設計。',
    skills: ['React', 'Next.js', 'Three.js', 'TypeScript', 'Node.js'],
    type: 'work'
  },
  {
    id: '2',
    year: '2023',
    title: '前端工程師',
    company: '數位行銷公司',
    description: '開發響應式網站和互動式行銷頁面，優化使用者體驗和轉換率。協助團隊導入現代化開發流程。',
    skills: ['React', 'Vue.js', 'GSAP', 'Tailwind CSS'],
    type: 'work'
  },
  {
    id: '3',
    year: '2022',
    title: '個人專案開發',
    company: '自由工作',
    description: '開始接觸 3D 網頁技術，完成多個實驗性專案。學習 Three.js 和 React Three Fiber，建立技術基礎。',
    skills: ['Three.js', 'WebGL', 'React', 'JavaScript'],
    type: 'project'
  },
  {
    id: '4',
    year: '2021',
    title: '資訊工程學士',
    company: '國立科技大學',
    description: '主修軟體工程，專精於網頁開發和資料結構。參與多項程式競賽，獲得優異成績。',
    skills: ['C++', 'Java', 'Python', 'Database', 'Algorithm'],
    type: 'education'
  }
]

// 時間軸項目組件
interface TimelineItemProps {
  item: TimelineItem
  index: number
  isLeft: boolean
}

function TimelineItemComponent({ item, index, isLeft }: TimelineItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // 根據類型決定顏色
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-primary-500'
      case 'education': return 'bg-green-500'
      case 'project': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work': return '💼'
      case 'education': return '🎓'
      case 'project': return '🚀'
      default: return '📍'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* 時間軸卡片 */}
      <div className={`timeline-card w-96 ${isLeft ? 'mr-8' : 'ml-8'}`}>
        {/* 年份標籤 */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getTypeColor(item.type)} text-white`}>
          <span className="mr-1">{getTypeIcon(item.type)}</span>
          {item.year}
        </div>

        {/* 標題和公司 */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <h4 className="text-lg text-primary-600 font-semibold mb-3">{item.company}</h4>

        {/* 描述 */}
        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

        {/* 技能標籤 */}
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* 箭頭指向時間軸 */}
        <div className={`absolute top-8 ${isLeft ? 'left-full' : 'right-full'} w-0 h-0 
                        ${isLeft ? 'border-l-8 border-l-white' : 'border-r-8 border-r-white'}
                        border-t-8 border-b-8 border-t-transparent border-b-transparent`}></div>
      </div>

      {/* 時間軸節點 */}
      <div className={`relative ${getTypeColor(item.type)} w-4 h-4 rounded-full z-10 flex items-center justify-center`}>
        <div className="w-2 h-2 bg-white rounded-full"></div>
        
        {/* 節點光暈效果 */}
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 ${getTypeColor(item.type)} rounded-full opacity-30`}
        ></motion.div>
      </div>
    </motion.div>
  )
}

// 主時間軸組件
export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto px-4 relative">
      {/* 垂直時間軸線 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

      {/* 時間軸項目 */}
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>

      {/* 結尾點 */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: timelineData.length * 0.2 + 0.5 }}
        className="flex justify-center"
      >
        <div className="bg-primary-500 w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✨</span>
        </div>
      </motion.div>

      {/* TODO-LLM:Timeline:Add character walking animation along timeline */}
    </div>
  )
} 