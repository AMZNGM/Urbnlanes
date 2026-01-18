'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Building2, Award, Globe, TrendingUp } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import db from '@/database/urbnlanes-db.json'
import SplitText from '@/components/ui/text/SplitText'
import BreathingText from './ui/text/BreathingText'

export default function SisterCompanies() {
  const { t } = useTranslation()
  const sisterCompanies = db.whoweare.sisterCompanies
  const stats = db.whoweare.stats
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div>
      <div className="flex max-md:flex-col gap-4 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h3
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-black/60 text-sm uppercase tracking-[0.2em] mb-4"
          >
            Our Heritage
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-light text-black text-5xl md:text-7xl tracking-tight mb-6"
          >
            Three Decades of
            <br />
            <span className="bg-clip-text bg-linear-to-r from-black to-zinc-400 text-transparent">Building Dreams</span>
          </motion.h2>

          {/* Stats Grid */}
          <div className="gap-6 grid grid-cols-2 md:grid-cols-4 mb-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-black/5 hover:bg-black/10 backdrop-blur-lg border border-black/10 text-center transition-all duration-300 p-6"
              >
                <stat.icon className="size-8 text-black/60 group-hover:text-black transition-colors mx-auto mb-4" />
                <div className="font-light text-black text-3xl md:text-4xl mb-2">{stat.value}</div>
                <div className="text-black/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div className="text-center mb-16">
            <motion.h3
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-black/60 text-sm uppercase tracking-[0.2em] mb-4"
            >
              Our Network
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-light text-black text-4xl md:text-5xl tracking-tight"
            >
              Our Sister Companies
              <br />
              <span className="text-black/60 text-2xl md:text-3xl">in Kuwait and Egypt</span>
            </motion.h2>
          </div>
          {/* Logos Grid */}
          <div className="max-w-5xl gap-6 grid grid-cols-2 md:grid-cols-3 mx-auto">
            {sisterCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                {/* Glassy card */}
                <div className="relative aspect-square overflow-hidden flex justify-center items-center bg-black/5 backdrop-blur-xl border border-black/10 p-8 md:p-12">
                  {/* Hover linear effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-linear-to-br from-black/10 to-transparent"
                  />
                  {/* Logo placeholder - replace with actual Image component */}
                  <div className="z-10 relative w-full h-full flex flex-col justify-center items-center">
                    <div className="w-24 h-24 flex justify-center items-center bg-black/10 mb-4">
                      <Building2 className="size-12 text-black/60" />
                    </div>
                    <div className="font-light text-black/80 text-sm text-center">{company.name}</div>
                    <div className="text-black/40 text-xs uppercase tracking-wider mt-1">{company.country}</div>
                  </div>
                  {/* Corner accent */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="top-0 right-0 absolute w-16 h-16 border-black/30 border-t-2 border-r-2"
                  />
                </div>
                {/* Glow effect on hover */}
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="-z-10 absolute inset-0 bg-black/5 blur-xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
