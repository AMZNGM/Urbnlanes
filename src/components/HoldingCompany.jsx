'use client'

import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import BreathingText from '@/components/ui/text/BreathingText'

export default function HoldingCompany() {
  const { t } = useTranslation()

  return (
    <section className="relative w-dvw overflow-hidden flex flex-col justify-center items-center bg-text text-black">
      <BreathingText
        as="h6"
        className="font-bold text-[10.6dvw] max-md:text-[9.6dvw] text-center text-nowrap ltr:md:leading-none ltr:md:-translate-x-1 ltr:md:-translate-y-4 -mt-1"
      >
        {t('common.holdingCompany')}
      </BreathingText>

      <Image
        src="/images/logos/eagroup-logo.webp"
        alt="EA Group Logo"
        width={400}
        height={400}
        sizes="10dvw"
        className="w-[30dvw] h-auto object-contain invert"
      />

      <BreathingText
        as="h6"
        className="font-bold text-[10.6dvw] max-md:text-[9.6dvw] text-center text-nowrap ltr:md:leading-none ltr:md:-translate-x-1 ltr:md:translate-y-4"
      >
        {t('common.holdingCompany')}
      </BreathingText>
    </section>
  )
}
