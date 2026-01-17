'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import MainBtn from '@/components/ui/buttons/MainBtn'
import Heading from '@/components/ui/Heading'
import ArrowIcon from '@/components/ui/icons/ArrowIcon'

export default function OurValues() {
  const { t } = useTranslation()
  const values = t('db.whoweare.values')
  const images = [
    '/images/projects/east-lane/el-gallery-1.webp',
    '/images/projects/yellow-residence/yr-gallery-9.webp',
    '/images/projects/yellow-lane/yl-gallery-3.webp',
  ]

  return (
    <section className="relative w-full h-dvh max-md:h-[200dvh] overflow-hidden flex flex-col justify-center gap-8 bg-black text-text px-4">
      <Heading text={t('common.ourValues')} />

      {Array.isArray(values) &&
        values.slice(0, 3).map((value, index) => (
          <div
            key={value.title}
            className={`h-1/3 flex max-md:flex-col justify-between items-center gap-8 ${index === 1 ? 'flex-row-reverse' : ''}`}
          >
            <div data-scroll data-scroll-speed="0.04" className="z-10 relative w-full h-full overflow-hidden rounded-2xl">
              <motion.div
                data-scroll
                data-scroll-speed="0.05"
                initial={{ opacity: 0.5, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative w-full h-full bg-bg rounded-2xl"
              >
                <Image
                  src={images[index]}
                  alt={value.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover rounded-2xl"
                />
              </motion.div>
            </div>

            <motion.div
              data-scroll
              data-scroll-speed="0.05"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-[90vw]"
            >
              <motion.h3
                initial={{ opacity: 0, x: index === 1 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="z-10 relative font-bold text-2xl mb-4"
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className={`flex max-md:justify-end mt-12 ${index === 1 ? '' : 'ltr:flex-row-reverse rtl:flex-row'}`}
              >
                <MainBtn href={`/about`} size="sm" icon={ArrowIcon}>
                  {t('common.seeMore')}
                </MainBtn>
              </motion.div>
            </motion.div>
          </div>
        ))}
    </section>
  )
}
