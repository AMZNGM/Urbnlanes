'use client'

import Image from 'next/image'
import { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

function useColumns() {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) {
        setColumns(5)
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setColumns(3)
      } else {
        setColumns(1)
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return columns
}

export default function MasonryGrid({ projects, openModal }) {
  const containerRef = useRef(null)
  const columnsCount = useColumns()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end start'],
  })

  // Shared Transform
  const parallaxY = useTransform(scrollYProgress, [0, 1], [150, -150])
  const parallaxSubtle = useTransform(scrollYProgress, [0, 1], [80, -80])

  const columns = useMemo(() => {
    // Create arrays for each column
    const cols = Array.from({ length: columnsCount }, () => [])

    // Determine fill order for symmetrical balancing
    let fillOrder = []
    if (columnsCount === 5) fillOrder = [0, 4, 1, 3, 2] // Outer -> Inner -> Center
    else if (columnsCount === 3) fillOrder = [0, 2, 1] // Outer -> Center
    else fillOrder = [0] // Single column

    projects.forEach((project, i) => {
      const colIndex = fillOrder[i % columnsCount]
      cols[colIndex].push(project)
    })
    return cols
  }, [projects, columnsCount])

  return (
    <div ref={containerRef} className="w-full flex md:flex-row flex-col gap-4">
      {columns.map((col, colIndex) => {
        // Dynamic Parallax Logic
        let yTransform = 0
        const isCenter = colIndex === Math.floor(columnsCount / 2)

        if (columnsCount > 1) {
          if (columnsCount === 5) {
            if (colIndex === 0 || colIndex === 4) yTransform = parallaxY
            else if (colIndex === 1 || colIndex === 3) yTransform = parallaxSubtle
          } else if (columnsCount === 3) {
            if (colIndex === 0 || colIndex === 2) yTransform = parallaxY
          }
        }

        return (
          <motion.div
            key={colIndex}
            style={isCenter ? {} : { y: yTransform }}
            className={`flex flex-col gap-4 justify-center w-full ${
              columnsCount === 5 ? 'md:w-1/5' : columnsCount === 3 ? 'md:w-1/3' : ''
            }`}
          >
            {col.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} openModal={openModal} />
            ))}
          </motion.div>
        )
      })}
    </div>
  )
}

function ProjectCard({ project, index, openModal }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Internal parallax: Image moves slower than container (creating depth)
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.25])

  return (
    <motion.div
      ref={cardRef}
      onClick={() => openModal(project)}
      initial={{ opacity: 0.5, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.05 }}
      style={{ y: 0 }} // Reset any inherited transforms logic if applied by parent
      className={`${project.height} relative group cursor-pointer overflow-hidden rounded-xl w-full h-full min-h-75`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <motion.div className="bottom-4 left-4 absolute overflow-hidden bg-black/25 md:opacity-0 group-hover:opacity-100 backdrop-blur-xl rounded-2xl transition-all md:translate-x-8 md:translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 duration-500 p-4">
        <h3 className="font-mono">{project.title || 'Project name'}</h3>
        <span className="font-mono text-xs normal-case tracking-wide">
          {project.location?.city || 'New Cairo'}, {project.location?.country || 'Egypt'}
        </span>
      </motion.div>
    </motion.div>
  )
}
