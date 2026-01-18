'use client'

import { useTranslation } from '@/hooks/useTranslation'
import SplitText from '@/components/ui/text/SplitText'
import Image from 'next/image'

export default function TextPanel({ className = '', paraClassName = '', imageClassName = '', title = '', para = '', image = '' }) {
  const { t } = useTranslation()

  return (
    <section className={`relative w-dvw overflow-hidden bg-text text-black px-4 py-24 ${className}`}>
      {image && (
        <Image src={image} alt="BackGround Image" fill className={`z-0 absolute inset-0 object-cover opacity-40 ${imageClassName}`} />
      )}

      <div className="z-10 relative w-full max-w-5xl h-full flex flex-col justify-center items-center gap-4 text-center mx-auto">
        <div data-scroll data-scroll-speed="0.02">
          <SplitText as="h3" className="overflow-y-hidden text-5xl">
            {t(title)}
          </SplitText>
        </div>

        <div data-scroll data-scroll-speed="0.05">
          <SplitText as="p" stagger="0.01" className={`text-2xl normal-case opacity-60 ${paraClassName}`}>
            {t(para)}
          </SplitText>
        </div>
      </div>
    </section>
  )
}
