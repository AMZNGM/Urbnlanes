'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from '@/translations/useTranslation'
import { Plus } from 'lucide-react'
import { useClipPath } from '@/hooks/useClipPath'
import TText from '@/translations/TText'
import Heading from '@/components/ui/Heading'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimText from '@/components/ui/text/AnimText'
import NumberTicker from '@/components/ui/text/NumberTicker'
import Shine from '@/components/ui/effects/Shine'

export default function WhoWeAre() {
  const { t } = useTranslation()
  const stats = t('db.whoweare.statistics')
  const imageRef = useRef<HTMLDivElement>(null)
  const { clipPath } = useClipPath({ imageRef: imageRef as React.RefObject<HTMLElement> })

  return (
    <section className="relative w-full h-full overflow-hidden bg-black text-text px-18 max-md:px-4 py-8">
      <AnimIn className="relative space-y-18">
        <Heading text={<TText tKey={'common.whoWeAre'} />} tagline={<TText tKey={'db.whoweare.tagline'} />} />

        <div className="gap-12 max-md:gap-16 grid lg:grid-cols-12">
          {/* Left col */}
          <AnimIn delay="0.6" className="relative lg:col-span-7">
            <div className="relative mb-12">
              <ImageIn
                src="/images/projects/east-lane/el-main-3.avif"
                alt="EastLane Project"
                sizes="(max-width: 768px) 60vw, (max-width: 1024px) 70vw, 60vw"
                divClassName="relative h-[50vh]!"
                priority={true}
              />

              <AnimIn
                delay="1"
                className="-right-18 max-md:right-0 -bottom-2 z-30 absolute backdrop-blur-2xl border rounded-sm px-8 py-4 rotate -6"
              >
                <p className="text-main text-xs tracking-[0.3vw]">
                  <TText tKey={'db.metadata.company.tagline'} />
                </p>
              </AnimIn>
            </div>

            <AnimText as="p" delay={1} stagger={0.008} className="max-md:text-sm normal-case leading-relaxed">
              <TText tKey={'db.whoweare.description'} />
            </AnimText>

            <a
              href="tel:+15061"
              className="flex items-center gap-1 text-main hover:text-text text-xs hover:text-sm italic transition-all duration-700 mt-4"
            >
              <div className="w-8 h-px bg-main" />
              <TText tKey={'common.hotline'} />
              <span className="px-px">:</span>
              <TText tKey={'db.metadata.company.hotline'} />
            </a>
          </AnimIn>

          {/* Right col */}
          <AnimIn className="space-y-12 lg:col-span-5">
            <div className="relative overflow-hidden space-y-8 bg-black border rounded-sm p-8">
              {Array.isArray(stats) &&
                stats.map((stat: any, index: number) => (
                  <div key={index} className="z-10 relative border-l transition-transform hover:translate-x-2.5 duration-300 pl-6">
                    <div className="flex items-center font-light max-md:font-medium text-[2vw] max-lg:text-[5vw]">
                      <NumberTicker value={stat.value} />
                      <Plus size={20} />
                    </div>
                    <AnimText
                      as="h3"
                      delay={index * 0.1 + 1}
                      className="font-extralight max-sm:font-medium text-[1vw] max-md:text-[3vw] max-lg:text-[1.7vw] tracking-wide"
                    >
                      {stat.title}
                    </AnimText>
                  </div>
                ))}

              <Shine />
              <div className="top-0 left-0 absolute w-20 h-20 border-main/35 border-t border-l rounded-tl-sm" />
              <div className="right-0 bottom-0 absolute w-20 h-20 border-main/35 border-r border-b rounded-br-sm" />
            </div>

            <AnimIn className="relative rounded-2xl p-4">
              <div ref={imageRef} className="z-30 relative h-[38vh] overflow-hidden rounded-2xl">
                <ImageIn src="/images/projects/yellow-residence/yr-gallery-3.webp" alt="EastLane Project" duration={0.5} />
                <motion.div style={{ clipPath }} className="z-10 absolute inset-0">
                  <ImageIn src="/images/projects/yellow-residence/yr-gallery-2.webp" alt="image clipPath" duration={0.5} />
                </motion.div>
              </div>
              <div className="top-0 left-0 z-30 absolute w-12 h-12 border-main/35 border-t-2 border-l-2 rounded-sm" />
              <div className="right-0 bottom-0 z-30 absolute w-12 h-12 border-main/35 border-r-2 border-b-2 rounded-sm" />
            </AnimIn>
          </AnimIn>
        </div>
      </AnimIn>
    </section>
  )
}
