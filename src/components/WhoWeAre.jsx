'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import db from '@/database/urbnlanes-db.json'
import Heading from '@/components/ui/Heading'
import TextAnimation from '@/components/ui/text/TextAnimation'

export default function WhoWeAre() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageRef,
    offset: ['start 60%', 'end 20%'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  return (
    <section ref={containerRef} className="relative w-full h-full overflow-hidden bg-black text-text px-18 max-md:px-4 py-8">
      <motion.div style={{ opacity, scale }} className="relative space-y-18">
        <Heading text={t('common.whoWeAre')} tagline={t('db.whoweare.tagline')} />

        <div className="gap-12 max-md:gap-16 grid lg:grid-cols-12">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0.5, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative lg:col-span-7"
          >
            <div className="relative mb-12">
              <motion.div
                initial={{ filter: 'blur(10px' }}
                whileInView={{ filter: 'blur(0px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                data-scroll
                data-scroll-speed="0.1"
                className="relative h-[50vh]"
              >
                <Image
                  src="/images/projects/east-lane/el-main-3.avif"
                  alt="EastLane Project"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
                  className="object-center object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
                className="-right-18 max-md:right-0 -bottom-2 z-30 absolute backdrop-blur-2xl border rounded-sm px-8 py-4 rotate -6"
              >
                <p className="text-main text-xs tracking-[0.3vw]">{t('db.metadata.company.tagline')}</p>
              </motion.div>
            </div>

            <p className="text-[1vw] max-md:text-[4vw] max-lg:text-[2vw] normal-case text-balance"> {t('db.whoweare.description')} </p>

            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-px bg-main" />
              <a href="tel:+15061" className="text-main hover:text-text text-xs hover:text-sm italic transition-all duration-700">
                {`${t('common.hotline')} : ` + db.metadata.company.hotline}
              </a>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0.5, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-12 lg:col-span-5"
          >
            <div className="relative overflow-hidden bg-black border rounded-sm p-8">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: ['120%', '-120%'] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-main/20 to-transparent -rotate-130 scale-150"
              />

              <div className="top-0 left-0 absolute w-20 h-20 border-main/35 border-t border-l rounded-tl-sm" />
              <div className="right-0 bottom-0 absolute w-20 h-20 border-main/35 border-r border-b rounded-br-sm" />

              <div className="relative space-y-8">
                {[
                  { number: db.whoweare.statistics.yearsOfExperience, label: t('common.yearsOfExperience') },
                  { number: db.whoweare.statistics.projectsCompleted, label: t('common.projectsCompleted') },
                  { number: db.whoweare.statistics.towersDelivered, label: t('common.towersDelivered') },
                  { number: db.whoweare.statistics.landmarkProjects, label: t('common.landmarkProjects') },
                  { number: db.whoweare.statistics.workforce, label: t('common.workforce') },
                ].map((stat, index) => (
                  <div key={index} className="border-main/30 border-l text-text hover:translate-x-2.5 duration-300 pl-6 cursor-default">
                    <TextAnimation text={stat.number} as="span" className="font-light max-md:font-medium text-[2vw] max-lg:text-[5vw]" />

                    <TextAnimation
                      text={stat.label}
                      as="h3"
                      className="font-extralight max-sm:font-medium text-[1vw] max-md:text-[3vw] max-lg:text-[1.7vw] tracking-wide"
                    />
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ filter: 'blur(10px' }}
              whileInView={{ filter: 'blur(0px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative rounded-2xl p-4"
            >
              <div ref={imageRef} data-scroll data-scroll-speed="0.05" className="z-30 relative h-[38vh] overflow-hidden rounded-2xl">
                <Image
                  src="/images/projects/yellow-residence/yr-gallery-3.webp"
                  alt="EastLane Project"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 35vw"
                  className="object-center object-cover scale-110 hover:scale-115 transition-transform duration-700"
                />

                <motion.div
                  style={{
                    clipPath: useTransform(imageScrollProgress, (latest) => `inset(${latest * 100}% 0 0 0)`),
                  }}
                  className="z-10 absolute inset-0"
                >
                  <Image
                    src="/images/projects/yellow-residence/yr-gallery-2.webp"
                    alt="image  clipPath"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 35vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              <div className="top-0 left-0 z-30 absolute w-12 h-12 border-main/35 border-t-2 border-l-2 rounded-sm" />
              <div className="right-0 bottom-0 z-30 absolute w-12 h-12 border-main/35 border-r-2 border-b-2 rounded-sm" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
