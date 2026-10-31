'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// Timeline item interface
interface TimelineItem {
  id: string
  year: string
  title: string
  company: string
  icon: {
    src: string
    alt: string
    width: number
    height: number
  }
}

// Timeline data
// ⚠️ `year` must start with a number: items are sorted with parseInt(year), and e.g. 'Summer 2026' would parse to NaN
const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2000-2019',
    title: 'Early Years',
    company: 'Taiwan',
    icon: {
      src: '/images/taiwan.svg',
      alt: 'Taiwan Icon',
      width: 80,
      height: 80
    }
  },
  {
    id: '2',
    year: '2019-2024',
    title: 'BSc & MSc in Industrial Engineering',
    company: 'National Tsing Hua University',
    icon: {
      src: '/images/tsinghua.svg',
      alt: 'National Tsing Hua University',
      width: 80,
      height: 80
    }
  },
  {
    id: '3',
    year: '2025',
    title: 'Data Analyst Intern',
    company: 'WOOX',
    icon: {
      src: '/images/woox.svg',
      alt: 'WOOX',
      width: 80,
      height: 80
    }
  },
  {
    id: '4',
    year: '2025-Present',
    title: 'Master in Machine Learning and Data Science',
    company: 'Northwestern University',
    icon: {
      src: '/images/northwestern.svg',
      alt: 'Northwestern University',
      width: 80,
      height: 80
    }
  },
  {
    id: '5',
    year: '2026',
    title: 'AI Engineer Intern',
    company: 'GoFundMe',
    icon: {
      src: '/images/gofundme.png',
      alt: 'GoFundMe',
      width: 80,
      height: 80
    }
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

  // 💡 lg:flex-1 + lg:min-w-0 splits the row evenly however many items there are,
  // so adding a journey entry no longer means rewriting a hard-coded w-1/N
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isTop ? -50 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isTop ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`
        relative flex items-center justify-center
        w-full lg:flex-1 lg:min-w-0
        mb-12 lg:mb-0
        ${isTop ? 'lg:flex-col' : 'lg:flex-col-reverse'}
      `}
    >
      {/* Timeline card */}
      <div className={`
        timeline-card
        bg-white rounded-lg shadow-lg p-6 lg:p-4 xl:p-6
        w-[90%] lg:w-full max-w-[400px]
        h-[350px]
        relative
        hover:shadow-xl transition-shadow duration-300
        border border-gray-100
        ${isTop ? 'lg:mb-8' : 'lg:mt-8'}
        text-center
        flex flex-col items-center justify-center
      `}>
        {/* Icon */}
        <div className="mb-4">
          <Image
            src={item.icon.src}
            alt={item.icon.alt}
            height={item.icon.height}
            width={item.icon.width}
          />
        </div>

        {/* Year */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white">
          {item.year}
        </div>

        {/* Title and company */}
        <h3 className="text-xl lg:text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
        <h4 className="text-lg lg:text-base text-gray-600 font-semibold">{item.company}</h4>
      </div>
    </motion.div>
  )
}

// Main Timeline component
export default function Timeline() {
  const sortedTimelineData = [...timelineData].sort((a, b) => parseInt(a.year) - parseInt(b.year))

  return (
    <div className="w-full mx-auto px-0 relative py-20">
      {/* Timeline line - Mobile vertical */}
      <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-200 to-gray-300 h-full"></div>

      {/* Timeline line - Desktop horizontal */}
      <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300"></div>

      {/* Timeline items container */}
      <div className="relative flex flex-col lg:flex-row lg:justify-center lg:items-center lg:flex-nowrap gap-6">
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
        className="flex justify-center lg:hidden"
      >
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✨</span>
        </div>
      </motion.div>
    </div>
  )
} 