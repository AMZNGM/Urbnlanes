'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { getWhoweare } from '@/lib/getDatabase'
import MainBtn from '@/components/ui/buttons/MainBtn'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

export default function OurValues() {
  const whoweareData = getWhoweare()

  const images = [
    // '/images/projects/east-lane/el-banner.avif',
    // '/images/projects/east-lane/el-main-5.avif',
    // '/images/projects/noi/noi-cover.avif',

    // '/images/projects/east-lane/el-main-4.avif',
    // '/images/projects/east-lane/el-main-3.avif',

    '/images/projects/east-lane/el-gallery-1.webp',
    '/images/projects/yellow-residence/yr-gallery-1.avif',
    '/images/projects/yellow-lane/yl-gallery-3.webp',
  ]

  return (
    <section className="relative w-full h-screen max-md:h-[170vh] overflow-hidden bg-black text-text">
      <div className="h-full flex flex-col justify-center gap-8 px-18 max-md:px-4 py-12">
        {whoweareData.values?.slice(0, 3).map((value, index) => (
          <div
            key={value.title}
            className={`h-1/3 flex max-md:flex-col justify-between items-center gap-8 ${index === 1 ? 'flex-row-reverse' : ''}`}
          >
            <div className="z-10 relative w-full h-full overflow-hidden rounded-2xl">
              <motion.div
                initial={{ opacity: 0.5, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-scroll
                data-scroll-speed="0.05"
                className="w-full h-full bg-bg rounded-2xl"
              >
                <Image src={images[index]} alt={value.title} fill className="w-full h-full object-cover rounded-2xl" />
              </motion.div>
            </div>

            <motion.div
              className="relative w-full h-full flex flex-col justify-between md:py-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="z-10 relative font-bold text-2xl"
                initial={{ opacity: 0, x: index === 1 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {value.title}
              </motion.h3>
              <motion.p
                className="z-10 relative text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {value.description}
              </motion.p>

              <motion.div
                className={`flex max-md:justify-end ${index === 1 ? '' : 'flex-row-reverse'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                <MainBtn href={`/about`}>
                  See More
                  <ArrowIcon className="w-3 fill-bg -rotate-40" />
                </MainBtn>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
