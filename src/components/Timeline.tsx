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
    year: '2025-Present',
    title: 'KYC Analyst Intern',
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
        timeline-card
        bg-white rounded-lg shadow-lg p-6
        w-[90%] md:w-full max-w-[400px]
        h-[350px]
        relative
        hover:shadow-xl transition-shadow duration-300
        border border-gray-100
        ${isTop ? 'md:mb-8' : 'md:mt-8'}
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
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <h4 className="text-lg text-gray-600 font-semibold">{item.company}</h4>
      </div>
    </motion.div>
  )
}

// Main Timeline component
export default function Timeline() {
  const sortedTimelineData = [...timelineData].sort((a, b) => parseInt(a.year) - parseInt(b.year))

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