'use client'

import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function ArticleContent({ article }: { article: any }) {
  let ismobile = useIsMobile()
  let images = Array.isArray(article.image) ? article.image : [article.image]
  let date = article.date
  let { scrollYProgress } = useScroll({ offset: ['start start', 'end 200%'] })

  const randomColor = useMemo(() => {
    const colors = ['#ffe4b5', '#b0e0e6', '#ffd1dc', '#4f2413', '#ffe4b5', '#b0e0e6', '#ffd1dc', '#f2f0f1']
    const hash = (article.id || '').split('').reduce((acc: number, char: string) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }, [article.id])

  return (
    <div className="top-0 sticky h-[200dvh]">
      <section className="relative w-dvw h-full overflow-hidden bg-text text-bg px-8 max-md:px-2">
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          style={{
            clipPath: useTransform(scrollYProgress, [0, 1], ismobile ? ['inset(0 0 75% 0)', 'inset(0 0 50% 0)'] : ['inset(0 0 100% 0)', 'inset(0 0 50% 0)']),
            backgroundColor: randomColor,
          }}
          className="absolute inset-0 backdrop-blur-2xl"
        />

        <div className="h-dvh flex flex-col justify-center">
          <motion.div
            style={{
              width: useTransform(scrollYProgress, [0, 1], ['100%', '35%']),
              color: useTransform(scrollYProgress, [0, 1], ['#000', '#fff']),
            }}
            className="flex justify-center items-center gap-4 opacity-80 font-mono font-bold text-xs tracking-widest mx-auto mb-1"
          >
            <AnimText delay={0.6} as={'time'} className="pe-12 md:pe-6 lg:pe-5 xl:pe-4">
              {date}
            </AnimText>

            <MotionLine delay={0.9} className="origin-center" />

            <div className="flex gap-2">
              <AnimText delay={0.6} className="rtl:leading-10!">
                <TText tKey={`news.${Array.isArray(article.category) ? article.category[1] : article.category}`} />
              </AnimText>
              <AnimText delay={0.6} className="rtl:leading-10!">
                <TText tKey={`news.${Array.isArray(article.category) ? article.category[0] : article.category}`} />
              </AnimText>
            </div>
          </motion.div>

          <motion.div style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 0.4]) }}>
            <ImageIn
              src={images[0] || '/images/blogs/blog-placeholder.webp'}
              alt={article.title}
              className="scale-100!"
              divClassName="aspect-5/2 max-md:aspect-4/3 overflow-hidden rounded-xl blur-none!"
            />
          </motion.div>

          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-300%']), scale: useTransform(scrollYProgress, [0, 1], [1, 0.4]) }}
            className="w-fit max-md:max-w-sm max-w-2xl bg-bg/50 backdrop-blur-2xl rounded-xl text-[1.6dvw] text-text max-md:text-[4.5dvw] text-center normal-case leading-tight tracking-tighter -translate-y-18 max-md:-translate-y-8 mx-auto px-4 py-8"
          >
            <AnimIn as={'h1'} blur center delay={0.3}>
              {article.title}
            </AnimIn>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
