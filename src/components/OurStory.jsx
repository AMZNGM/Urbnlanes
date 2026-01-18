'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Building2, Award, Globe, TrendingUp } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import db from '@/database/urbnlanes-db.json'
import SplitText from '@/components/ui/text/SplitText'
import BreathingText from './ui/text/BreathingText'

export default function OurStory() {
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
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="h-1 bg-linear-to-r from-transparent via-black/30 to-transparent mt-24"
      />
      <div className="z-10 relative max-w-7xl mx-auto px-4 container">
        {/* Heritage Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto mb-32"
        >
          <div className="bg-black/5 backdrop-blur-xl border border-black/10 p-8 md:p-16">
            <div className="space-y-6 font-light text-black/80 text-lg md:text-xl leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                For nearly three decades, our legacy has been built not just on buildings, but on the trust we've earned and the promises
                we've honored.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                This deep-seated commitment has seen us flourish, delivering over 100 projects that have helped shape skylines and create
                vibrant spaces for life across the region.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                As we've grown to become one of the Middle East's leading real estate forces, we carry the torch of our founding principles.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-black"
              >
                We honor the heritage that began in Kuwait and enthusiastically continue that journey of growth and contribution here in
                Egypt.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating glassy card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="right-8 md:right-auto bottom-8 left-8 md:left-12 absolute md:max-w-2xl"
      >
        <div className="bg-black/5 backdrop-blur-xl border border-black/10 p-8 md:p-12">
          <p className="font-light text-black/90 text-lg md:text-xl leading-relaxed">
            Our story began in Kuwait in 1994, rooted in a singular, unwavering devotion to our vision and the communities we serve.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 border border-black/30 hover:border-black/50 text-black transition-colors duration-300 mt-8 px-6 py-3"
          >
            <Download className="size-5" />
            <span className="text-sm uppercase tracking-wider">Download Brochure</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
