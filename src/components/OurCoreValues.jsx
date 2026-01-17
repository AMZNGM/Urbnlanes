'use client'

import { motion } from 'motion/react'
import { Star, Clock, Shield, Zap } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import SplitText from '@/components/ui/text/SplitText'

export default function OurCoreValues() {
  const { t } = useTranslation()
  const coreValues = t('db.whoweare.coreValues')
  const coreValueIcons = [Star, Clock, Shield, Zap]

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-4 py-12">
      <div className="max-w-[90dvw] mx-auto">
        <SplitText as="h2" className="overflow-y-hidden text-5xl text-center mb-4">
          {coreValues?.[0]?.title}
        </SplitText>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-main/25 rounded-2xl p-8">
          {coreValues?.slice(1)?.map((value, index) => {
            const IconComponent = coreValueIcons[index]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative pb-2"
              >
                <div className="z-10 relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="w-16 h-16 flex justify-center items-center bg-main rounded-full text-text group-hover:scale-110 transition-transform duration-300 mb-6"
                  >
                    <IconComponent size={32} />
                  </motion.div>

                  <SplitText as="h3" className="font-bold group-hover:text-main text-2xl transition-colors duration-300 mb-4">
                    {value?.title}
                  </SplitText>

                  <SplitText
                    as="p"
                    stagger="0.01"
                    className="opacity-70 group-hover:opacity-90 text-base normal-case leading-relaxed transition-opacity duration-300"
                  >
                    {value?.description}
                  </SplitText>
                </div>

                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                  className="bottom-0 left-0 absolute h-0.5 bg-main rounded-full"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
