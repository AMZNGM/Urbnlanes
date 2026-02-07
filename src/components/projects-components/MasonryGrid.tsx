'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import TText from '@/translations/TText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

function useColumns() {
  let [columns, setColumns] = useState(1)

  useEffect(() => {
    let updateColumns = () => {
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

export default function MasonryGrid({ projects, openModal }: { projects: any[]; openModal: (p: any) => void }) {
  let containerRef = useRef(null)
  let columnsCount = useColumns()

  let { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end start'],
  })

  let parallaxY = useTransform(scrollYProgress, [0, 1], [250, -250])
  let parallaxSubtle = useTransform(scrollYProgress, [0, 1], [120, -120])

  let columns = useMemo(() => {
    let cols: any[][] = Array.from({ length: columnsCount }, () => [])

    let fillOrder: number[] = []
    if (columnsCount === 5)
      fillOrder = [0, 4, 1, 3, 2] // Outer -> Inner -> Center
    else if (columnsCount === 3)
      fillOrder = [0, 2, 1] // Outer -> Center
    else fillOrder = [0] // Single column

    projects.forEach((project, i) => {
      let colIndex = fillOrder[i % columnsCount]
      cols[colIndex].push(project)
    })
    return cols
  }, [projects, columnsCount])

  return (
    <div ref={containerRef} className="w-full flex md:flex-row flex-col gap-4">
      {columns.map((col, colIndex) => {
        // Dynamic Parallax Logic
        let yTransform: any = 0
        let isCenter = colIndex === Math.floor(columnsCount / 2)

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
            className={`flex flex-col gap-4 justify-center w-full ${columnsCount === 5 ? 'md:w-1/5' : columnsCount === 3 ? 'md:w-1/3' : ''}`}
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

function ProjectCard({ project, index, openModal }: { project: any; index: number; openModal: (p: any) => void }) {
  let cardRef = useRef(null)
  let { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  let y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  let scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.25])

  return (
    <motion.div
      ref={cardRef}
      onClick={() => openModal(project)}
      initial={{ opacity: 0.5, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.05 }}
      style={{ y: 0 }}
      className="group relative w-full h-full min-h-75 overflow-hidden rounded-lg cursor-pointer"
    >
      <ImageIn
        src={project.gallery?.[0] || ''}
        alt={'<TText tKey={`db.projects.${project.id}.name`} />'}
        sizes="(max-width: 768px) 60vw, (max-width: 1280px) 80vw, 90vw"
        style={{ y, scale }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        divClassName="absolute inset-0 w-full max-md:h-100! h-full!"
        hasOverlay
      />

      <motion.div className="right-2 bottom-2 left-2 absolute overflow-hidden bg-main/50 md:opacity-0 group-hover:opacity-100 backdrop-blur-3xl rounded-lg text-text transition-all md:translate-x-8 md:translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 duration-500 p-4">
        <h3 className="font-mono">
          <TText tKey={`db.projects.${project.id}.name`} />
        </h3>
        <span className="max-w-sm font-mono text-xs normal-case tracking-wide">
          {project.location?.city ? <TText tKey={`locations.${project.location.city}`} /> : <TText tKey={`locations.New Cairo`} />},{' '}
          {project.location?.country ? <TText tKey={`locations.${project.location.country}`} /> : <TText tKey={`locations.Egypt`} />}
        </span>
      </motion.div>
    </motion.div>
  )
}
