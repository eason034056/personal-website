'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaRobot,
  FaBrain,
  FaChartBar,
  FaFlask,
  FaExternalLinkAlt,
  FaCode,
} from 'react-icons/fa'
import type { IconType } from 'react-icons'

// Project data interface
interface Project {
  id: string
  title: string
  subtitle: string // organization / award / venue + timeframe
  description: string
  tech: string[]
  demoUrl?: string
  codeUrl?: string
  category: 'ai' | 'ml' | 'data' | 'research'
}

// Real projects sourced from CV (cv.pdf)
const projects: Project[] = [
  {
    id: '1',
    title: 'Real Estate Due Diligence Agent',
    subtitle: 'Land Vision · 2025',
    description:
      'An automated real estate due diligence agent built with LangGraph and MCP tool calling that compresses research turnaround from months to under an hour and cuts manual drafting time by 80%, synthesizing 20+ heterogeneous data sources into citation-backed risk reports.',
    tech: ['LangGraph', 'MCP', 'Multi-Agent', 'RAG', 'Python'],
    category: 'ai'
  },
  {
    id: '2',
    title: 'Regulatory Compliance NLP Pipeline',
    subtitle: 'WOOX · Global Crypto Exchange',
    description:
      'An automated NLP pipeline using text-similarity algorithms to process regulatory documents across 19 crypto exchanges, cutting manual compliance analysis time by 95%, plus a RAG-powered conversational AI for natural-language database querying at 97%+ validation accuracy.',
    tech: ['NLP', 'RAG', 'Tableau', 'Python', 'SQL'],
    category: 'data'
  },
  {
    id: '3',
    title: 'Soccer Scout Co-Pilot',
    subtitle: 'Northwestern AI Hackathon · 3rd Place',
    description:
      'An end-to-end scouting platform integrating predictive models with locally deployed LLMs fine-tuned via LoRA, reducing analyst workload by 80%. Engineered 40+ temporal and position-specific features and trained XGBoost/LightGBM ensembles reaching an AUC of 0.90.',
    tech: ['LoRA', 'XGBoost', 'LightGBM', 'Feature Engineering', 'Python'],
    category: 'ml'
  },
  {
    id: '4',
    title: 'AI-Powered Educational Analytics Platform',
    subtitle: 'Personal Project · 2025',
    description:
      'An AI tutor agent leveraging RAG and personalized student context to deliver real-time learning guidance, raising task completion rates by 32%. Adaptive feedback and dynamic graph-based proficiency tracking improved personalized learning-path accuracy by 85%.',
    tech: ['RAG', 'LLM', 'Graph', 'Prompt Engineering', 'Python'],
    codeUrl: 'https://github.com/eason034056/tutor-matching',
    category: 'ai'
  },
  {
    id: '5',
    title: 'Gait-Based Personal Identification',
    subtitle: 'Advanced Engineering Informatics · 2024',
    description:
      'Published research (Impact Factor 9.9, Top 10% in Computer Science) comparing image-based and time-series deep learning models for recognizing walking status and revealing personal identification from two types of feature datasets.',
    tech: ['Deep Learning', 'Time Series', 'CNN', 'PyTorch'],
    demoUrl: 'https://doi.org/10.1016/j.aei.2024.102729',
    category: 'research'
  }
]

// 💡 分類 → { 顯示文字, 對應 react-icons 圖示 } 的設定表。
// 對齊 about 頁「用 FaXxx 圖示而非 emoji」的做法，集中管理方便擴充。
const CATEGORY_META: Record<Project['category'], { label: string; Icon: IconType }> = {
  ai:       { label: 'AI AGENT', Icon: FaRobot },
  ml:       { label: 'MACHINE LEARNING', Icon: FaBrain },
  data:     { label: 'DATA', Icon: FaChartBar },
  research: { label: 'RESEARCH', Icon: FaFlask },
}

// 專案卡片組件
interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const { label, Icon } = CATEGORY_META[project.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onSelect(project)}
      // 對齊 about 頁卡片：白底、圓角、細灰邊、hover 抬升加陰影
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200
                 bg-white shadow-sm transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* 專案圖片區（用 about 頁的灰階漸層當佔位） */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-600 to-gray-800">
        {/* 置中的分類大圖示，淡淡浮在漸層上 */}
        <Icon
          size={56}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20"
        />

        {/* 分類標籤：白底膠囊 + 灰階圖示，呼應 about 的 chip 樣式 */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full
                        border border-gray-200 bg-white px-3 py-1 text-xs font-semibold
                        text-gray-800 shadow-sm">
          <Icon size={12} className="text-gray-600" />
          {label}
        </div>
      </div>

      {/* 專案資訊 */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        <p className="mb-3 mt-1 text-sm font-medium text-gray-500">{project.subtitle}</p>
        <p className="mb-4 leading-relaxed text-gray-600 line-clamp-3">{project.description}</p>

        {/* 技術標籤：對齊 about 頁的白底膠囊 */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white
                         px-3 py-1 text-sm font-medium text-gray-800 shadow-sm
                         transition-all hover:shadow"
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

  const categories = ['all', 'ai', 'ml', 'data', 'research']

  return (
    // 對齊 about 頁：淺灰背景 + py-24（同時也讓內容避開固定 navbar）
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* 標題區：沿用 about 頁的「大標 + w-24 漸層底線」 */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Projects</h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600" />
        </div>

        {/* 分類過濾器：沿用 about 頁 Skills/Tools 的 Tabs 樣式 */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center rounded-xl bg-gray-100 p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category === 'all' ? 'All' : category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 專案網格 */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
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
      </div>

      {/* 專案詳情彈窗 */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            // 對齊 about 頁卡片：白底大圓角 + 陰影
            className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-100
                       bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {selectedProject.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-2xl text-gray-400 transition-colors hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">{selectedProject.description}</p>

            {/* 技術標籤 */}
            <div className="mb-8 flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white
                             px-3 py-1 text-sm font-medium text-gray-800 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 text-white
                             shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <FaExternalLinkAlt size={14} />
                  <span>View Project</span>
                </a>
              )}
              {selectedProject.codeUrl && (
                <a
                  href={selectedProject.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white
                             px-6 py-3 text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <FaCode size={16} />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
