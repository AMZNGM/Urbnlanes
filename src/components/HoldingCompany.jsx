'use client'

import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import BreathingText from '@/components/ui/text/BreathingText'

export default function HoldingCompany() {
  const { t } = useTranslation()

  return (
    <section className="relative w-dvw overflow-hidden flex max-md:flex-col justify-center items-center rtl:gap-12 bg-text text-black">
      <h6 as="h6" className="md:hidden space-x-4 font-bold text-[9dvw] text-center text-nowrap">
        <span>{t('common.holding')}</span>
        <span>{t('common.company')}</span>
      </h6>

      <BreathingText as="h6" className="max-md:hidden font-bold text-[9dvw] text-center text-nowrap">
        {t('common.holding')}
      </BreathingText>

      <Image
        src="/images/logos/eagroup-logo.webp"
        alt="EA Group Logo"
        width={400}
        height={400}
        sizes="10dvw"
        className="z-10 relative ltr:w-full max-md:w-1/2 h-auto object-contain rtl:order-3 invert ltr:md:scale-125"
      />

      <BreathingText as="h6" staggerFrom="last" className="max-md:hidden font-bold text-[9dvw] text-center text-nowrap">
        {t('common.company')}
      </BreathingText>
    </section>
  )
}
