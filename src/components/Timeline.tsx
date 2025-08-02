'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Timeline item interface
interface TimelineItem {
  id: string
  year: string
  title: string
  company: string
  description: string
  skills: string[]
  type: 'work' | 'education' | 'project'
}

// Timeline data
const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2024',
    title: 'Full Stack Developer',
    company: 'Tech Startup',
    description: 'Developed innovative 3D web applications using React Three Fiber to create immersive user experiences. Participated in product planning and architecture design.',
    skills: ['React', 'Next.js', 'Three.js', 'TypeScript', 'Node.js'],
    type: 'work'
  },
  {
    id: '2',
    year: '2023',
    title: 'Frontend Developer',
    company: 'Digital Marketing Agency',
    description: 'Developed responsive websites and interactive marketing pages, optimizing user experience and conversion rates. Helped the team adopt modern development processes.',
    skills: ['React', 'Vue.js', 'GSAP', 'Tailwind CSS'],
    type: 'work'
  },
  {
    id: '3',
    year: '2022',
    title: 'Personal Projects',
    company: 'Freelance',
    description: 'Started exploring 3D web technologies and completed multiple experimental projects. Learned Three.js and React Three Fiber, building technical foundations.',
    skills: ['Three.js', 'WebGL', 'React', 'JavaScript'],
    type: 'project'
  },
  {
    id: '4',
    year: '2021',
    title: 'Bachelor of Computer Science',
    company: 'National University of Technology',
    description: 'Majored in Software Engineering, specializing in web development and data structures. Participated in programming competitions with excellent results.',
    skills: ['C++', 'Java', 'Python', 'Database', 'Algorithm'],
    type: 'education'
  }
]

// Timeline item component props
interface TimelineItemProps {
  item: TimelineItem
  index: number
  isTop?: boolean
}

function TimelineItemComponent({ item, index, isTop = false }: TimelineItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Get type-based gradient colors
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-gradient-to-r from-gray-700 to-gray-800'
      case 'education': return 'bg-gradient-to-r from-gray-600 to-gray-700'
      case 'project': return 'bg-gradient-to-r from-gray-500 to-gray-600'
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500'
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
      initial={{ opacity: 0, y: isTop ? -50 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isTop ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`
        relative flex items-center justify-center
        w-full md:w-1/4 min-w-[280px]
        mb-12 md:mb-0
        ${isTop ? 'md:flex-col' : 'md:flex-col-reverse'}
      `}
    >
      {/* Timeline card */}
      <div className={`
        timeline-card flex-1
        bg-white rounded-lg shadow-lg p-6
        w-[90%] md:w-full max-w-[400px]
        relative
        hover:shadow-xl transition-shadow duration-300
        border border-gray-100
        ${isTop ? 'md:mb-8' : 'md:mt-8'}
      `}>
        {/* Year tag */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getTypeColor(item.type)} text-white`}>
          <span className="mr-1">{getTypeIcon(item.type)}</span>
          {item.year}
        </div>

        {/* Title and company */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <h4 className="text-lg text-gray-600 font-semibold mb-3">{item.company}</h4>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md text-sm hover:from-gray-200 hover:to-gray-300 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Main Timeline component
export default function Timeline() {
  const sortedTimelineData = [...timelineData].sort((a, b) => parseInt(b.year) - parseInt(a.year))

  return (
    <div className="max-w-[1400px] mx-auto px-4 relative py-20">
      {/* Timeline line - Mobile vertical */}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-200 to-gray-300 h-full"></div>

      {/* Timeline line - Desktop horizontal */}
      <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300"></div>

      {/* Timeline items container */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-center md:flex-nowrap gap-4">
        {sortedTimelineData.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            isTop={index % 2 === 0}
          />
        ))}
      </div>

      {/* End point - Mobile only */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: sortedTimelineData.length * 0.2 + 0.5 }}
        className="flex justify-center md:hidden"
      >
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✨</span>
        </div>
      </motion.div>
    </div>
  )
} 