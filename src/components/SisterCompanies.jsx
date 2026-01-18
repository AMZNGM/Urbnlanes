'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { TrendingUp, Globe, Building2, Award } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import SplitText from '@/components/ui/text/SplitText'

export default function SisterCompanies() {
  const { t } = useTranslation()
  const sisterCompanies = db.whoweare.sisterCompanies
  const stats = t('db.whoweare.stats')
  const statsIcons = [TrendingUp, Globe, Building2, Award]

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-4 py-12">
      <div className="flex flex-col gap-22 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="w-full h-full flex flex-col gap-4"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            data-scroll
            data-scroll-speed="0.02"
            className="text-bg text-sm tracking-[0.2em]"
          >
            {t('common.ourHeritage')}
          </motion.div>

          <SplitText as="div" data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl">
            {t('common.dreams')}
          </SplitText>

          <div className="flex gap-4">
            <div className="w-2/3 max-lg:w-full flex flex-col gap-4 bg-main/25 rounded-2xl p-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="group"
                >
                  <div className="flex justify-between items-center bg-black/5 hover:bg-black/10 border rounded-xl hover:scale-97 transition-all duration-300 p-4">
                    <div className="space-y-2">
                      <div className="font-light text-3xl">{stat.value}</div>
                      <div className="text-sm tracking-wider">{stat.title}</div>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.2 }}
                    >
                      <div className="w-16 h-16 flex justify-center items-center bg-main/50 rounded-full text-black/60 group-hover:text-black group-hover:scale-90 transition-all duration-300">
                        {(() => {
                          const IconComponent = statsIcons[index]
                          return <IconComponent size={32} />
                        })()}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-lg:hidden relative w-1/3 overflow-hidden gap-4 grid grid-cols-1 bg-main/50 rounded-2xl">
              <div data-scroll data-scroll-speed="0.05">
                <Image
                  src="/images/projects/levels-tower/levels-gallery-6.avif"
                  alt="poster"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover scale-120"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-col gap-4"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            data-scroll
            data-scroll-speed="0.02"
            className="text-bg text-sm tracking-[0.2em]"
          >
            {t('common.ourNetwork')}
          </motion.div>

          <SplitText as="div" data-scroll data-scroll-speed="0.01" className="overflow-y-hidden text-5xl">
            {t('common.ourSisterCompaniesIn')}
          </SplitText>

          <div className="gap-4 grid grid-cols-3 bg-main/25 rounded-2xl p-8">
            {sisterCompanies.map((company, index) => (
              <motion.div
                key={company.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="group"
              >
                <div className="bg-black/5 hover:bg-black/10 border border-black/10 rounded-xl hover:scale-97 transition-all duration-300 p-4">
                  <div className="w-full h-32 flex justify-center items-center mb-4">
                    <Image
                      src={company.logo}
                      alt={company.title}
                      width={200}
                      height={200}
                      className="w-60 max-w-full h-auto max-h-full object-contain invert"
                    />
                  </div>

                  <div className="font-bold text-main text-center">{company.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
