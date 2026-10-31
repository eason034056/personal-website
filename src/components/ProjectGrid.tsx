'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCode, FaExpand, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'

// Project data interface
interface Project {
  id: string
  title: string
  subtitle: string // organization · role · timeframe
  image: string // 專案資訊圖（public/images/projects/*.webp）
  highlights: string[]
  demoUrl?: string
  codeUrl?: string
  category: 'ai' | 'ml' | 'data' | 'research'
}

// 內容與桌機版 Spline 場景的專案卡片一致（順序也相同）
const projects: Project[] = [
  {
    id: '1',
    title: 'Reusable AI Agent Deployment Framework',
    subtitle: 'GoFundMe · AI Engineer Intern · Jun 2026 – Aug 2026',
    image: '/images/projects/agent-framework.webp',
    highlights: [
      'Cut agent ship time by 75% (4 weeks to 1) with a deployment framework and CLI packaging LangGraph agents as FastAPI services on AWS',
      'Removed per-agent code for 5 capabilities (memory, guardrails, PII redaction, MCP, tools) via a plug-in harness with typed feature flags',
      'Unified debugging into one trace across API, PostgreSQL, and LLM calls with OpenTelemetry, Coralogix, and Braintrust',
    ],
    category: 'ai'
  },
  {
    id: '2',
    title: 'LLM Fine-Tuning for Share-Text Generation',
    subtitle: 'GoFundMe · AI Engineer Intern · Jun 2026 – Aug 2026',
    image: '/images/projects/llm-fine-tuning.webp',
    highlights: [
      'Projected an 80% cut in inference cost by proposing a fine-tuning project beyond my assigned intern project',
      'Built the training set by curating share-text examples from the existing LLM workflow',
      'Benchmarked the fine-tuned model against the baseline with a Braintrust eval set and automated scorers',
    ],
    category: 'ml'
  },
  {
    id: '3',
    title: 'Agentic Real Estate Due Diligence Platform',
    subtitle: 'Land Vision · AI Engineer Intern · Sep 2025 – May 2026',
    image: '/images/projects/real-estate-due-diligence.webp',
    highlights: [
      'Cut report drafting time by 80% with LangGraph agents that plan risk analysis and build MCP tools for zoning and property data',
      'Cited a source for every finding across 20+ data sources via BM25 + dense retrieval and cross-encoder reranking',
      'Shipped to production with a React front end, REST APIs, auth, tests, and CI/CD on GCP Cloud Run and Vertex AI',
    ],
    category: 'ai'
  },
  {
    id: '4',
    title: 'Multi-Agent Text-to-SQL Analytics System',
    subtitle: 'WOOX · Data Analyst Intern · Jun 2025 – Sep 2025',
    image: '/images/projects/text-to-sql.webp',
    highlights: [
      'Built a Python and PostgreSQL multi-agent system for natural-language query generation, SQL execution, and response synthesis.',
      'Achieved 98%+ SQL execution accuracy on natural-language data questions.',
    ],
    category: 'ai'
  },
  {
    id: '5',
    title: 'Automated Crypto Regulatory Monitoring',
    subtitle: 'WOOX · Data Analyst Intern · Jun 2025 – Sep 2025',
    image: '/images/projects/crypto-regulatory-monitoring.webp',
    highlights: [
      'Automated policy monitoring across 19 crypto exchanges using Python scrapers, change detection, and GitLab CI/CD.',
      'Reduced manual regulatory review time by 95%.',
    ],
    category: 'data'
  },
  {
    id: '6',
    title: 'Predictive Maintenance for Manufacturing Equipment',
    subtitle: 'National Smart Manufacturing Contest · Nov 2024',
    image: '/images/projects/predictive-maintenance.webp',
    highlights: [
      'Built an LSTM–Isolation Forest ensemble to predict UV oven lamp failures 72 hours ahead, achieving 96% precision and 91% recall.',
      'Created a React monitoring dashboard to support preventive maintenance; ranked in the top 10% of 153 teams.',
    ],
    category: 'ml'
  },
  {
    id: '7',
    title: 'Patient-Specific Agentic RAG for Radiation Oncology',
    subtitle: 'Northwestern Medicine Capstone · Sep 2026 – Present',
    image: '/images/projects/oncology-rag.webp',
    highlights: [
      'Unified 400 de-identified patient cases across 14 disease sites and built retrieval combining clinical-variable similarity with semantic search.',
      'Extended a guideline-based RAG platform into an agentic pipeline generating patient-specific treatment recommendations with evidence citations.',
    ],
    category: 'research'
  },
  {
    id: '8',
    title: 'Free AI Tutor and Tutor-Matching Platform',
    subtitle: 'Founder & Sole Engineer · Feb 2025 – Present',
    image: '/images/projects/ai-tutor.webp',
    highlights: [
      'Founded a second startup, building a free AI tutor so students with limited educational resources can ask questions freely and learn at their own pace.',
      'Built the platform using Next.js, FastAPI, and PostgreSQL, onboarding 300 tutors and families and improving AI responses through user feedback.',
    ],
    category: 'ai'
  }
]

// 專案卡片組件
interface ProjectCardProps {
  project: Project
  index: number
  onZoom: (project: Project) => void
}

function ProjectCard({ project, index, onZoom }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      // 對齊 about 頁卡片：白底、圓角、細灰邊
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      {/* 資訊圖：手機上字很小，所以整張圖都是「點擊放大」的按鈕 */}
      <button
        type="button"
        onClick={() => onZoom(project)}
        aria-label={`Enlarge ${project.title} diagram`}
        className="relative block aspect-video w-full border-b border-gray-100 bg-[#fbfaf7]"
      >
        <Image
          src={project.image}
          alt={`${project.title} diagram`}
          fill
          // 💡 sizes 告訴瀏覽器這張圖在畫面上約佔多寬，next/image 才會挑剛好的尺寸下載；
          // 沒寫的話會產生以 100vw 為準、但不精準的 srcset
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
          // 只有第一張在首屏，提早載入；其餘維持預設的 lazy loading
          priority={index === 0}
        />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full
                         bg-gray-900/70 px-2.5 py-1 text-xs font-medium text-white">
          <FaExpand size={10} />
          Zoom
        </span>
      </button>

      {/* 專案資訊 */}
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-gray-900">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-gray-500">{project.subtitle}</p>

        <ul className="mt-4 space-y-2">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-gray-600">
              {/* ⚠️ flex-none 讓圓點不會被長句子擠扁；mt-2 讓它對齊第一行文字的中線 */}
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gray-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {(project.demoUrl || project.codeUrl) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white
                           shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <FaExternalLinkAlt size={12} />
                <span>View Project</span>
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2
                           text-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <FaCode size={14} />
                <span>View Code</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

// 專案網格主組件
export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [zoomedProject, setZoomedProject] = useState<Project | null>(null)

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
              onZoom={setZoomedProject}
            />
          ))}
        </motion.div>
      </div>

      {/* 大圖檢視：點任何地方關閉，雙指可用瀏覽器原生縮放看細節 */}
      {zoomedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/90 p-4 backdrop-blur-sm"
          onClick={() => setZoomedProject(null)}
        >
          <button
            type="button"
            onClick={() => setZoomedProject(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-[#fbfaf7]"
          >
            <Image
              src={zoomedProject.image}
              alt={`${zoomedProject.title} diagram`}
              fill
              sizes="100vw"
              // 💡 大圖跳過 next/image 的縮圖：它只會依「目前螢幕寬度」挑尺寸，
              // 雙指放大後就糊了。原檔是 <100KB 的 WebP，直接給原圖反而最划算
              unoptimized
              className="object-contain"
            />
          </motion.div>
          <p className="mt-4 text-center text-sm font-medium text-gray-200">{zoomedProject.title}</p>
          <p className="mt-1 text-xs text-gray-400">Pinch to zoom · Tap to close</p>
        </motion.div>
      )}
    </div>
  )
}
