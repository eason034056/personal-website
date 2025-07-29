'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// 專案資料介面
interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  demoUrl?: string
  codeUrl?: string
  category: 'web' | '3d' | 'mobile' | 'game'
}

// 專案資料
const projects: Project[] = [
  {
    id: '1',
    title: '3D Portfolio Website',
    description: '使用 React Three Fiber 打造的互動式個人網站，結合 3D 角色導覽和沉浸式場景。',
    image: '/images/project-portfolio.jpg',
    tech: ['React', 'Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/example',
    category: '3d'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: '全端電商平台，包含購物車、支付系統、後台管理等完整功能。',
    image: '/images/project-ecommerce.jpg', 
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/example',
    category: 'web'
  },
  {
    id: '3',
    title: 'WebGL 粒子系統',
    description: '純 WebGL 實作的粒子效果系統，支援多種動畫模式和互動操作。',
    image: '/images/project-particles.jpg',
    tech: ['WebGL', 'GLSL', 'JavaScript', 'Canvas'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/example',
    category: '3d'
  },
  {
    id: '4',
    title: 'React Native App',
    description: '跨平台行動應用程式，包含即時通訊、地圖定位等功能。',
    image: '/images/project-mobile.jpg',
    tech: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/example',
    category: 'mobile'
  }
]

// 專案卡片組件
interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // 根據分類決定顏色
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web': return 'bg-blue-500'
      case '3d': return 'bg-purple-500'
      case 'mobile': return 'bg-green-500'
      case 'game': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return '🌐'
      case '3d': return '🎮'
      case 'mobile': return '📱'
      case 'game': return '🎯'
      default: return '💻'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* 專案圖片 */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {/* 暫時用漸層代替圖片 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-80"></div>
        
        {/* 分類標籤 */}
        <div className={`absolute top-3 left-3 ${getCategoryColor(project.category)} text-white px-2 py-1 rounded-full text-sm font-semibold`}>
          <span className="mr-1">{getCategoryIcon(project.category)}</span>
          {project.category.toUpperCase()}
        </div>

        {/* Hover 覆蓋層 */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-white mb-4">點擊查看詳情</p>
              <div className="flex space-x-3">
                {project.demoUrl && (
                  <button 
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.demoUrl, '_blank')
                    }}
                  >
                    🔗 Demo
                  </button>
                )}
                {project.codeUrl && (
                  <button 
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.codeUrl, '_blank')
                    }}
                  >
                    📝 Code
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 專案資訊 */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
        
        {/* 技術標籤 */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// 專案網格主組件
export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // 過濾專案
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const categories = ['all', 'web', '3d', 'mobile', 'game']

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* 分類過濾器 */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-2 bg-white rounded-full p-2 shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              {category === 'all' ? '全部' : category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 專案網格 */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
        ))}
      </motion.div>

      {/* 專案詳情彈窗 */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">{selectedProject.description}</p>
            
            {/* 詳細資訊可以在這裡擴展 */}
            <div className="flex space-x-4">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  🔗 查看 Demo
                </a>
              )}
              {selectedProject.codeUrl && (
                <a
                  href={selectedProject.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  📝 查看程式碼
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* TODO-LLM:ProjectGrid:Add 3D scene background with interactive lab items */}
    </div>
  )
} 