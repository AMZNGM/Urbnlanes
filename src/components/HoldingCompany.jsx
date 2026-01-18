'use client'

import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import BreathingText from '@/components/ui/text/BreathingText'

export default function HoldingCompany() {
  const { t } = useTranslation()

  return (
    <section className="rtl:hidden relative w-dvw overflow-hidden bg-text text-black max-md:pb-12">
      <div className="flex max-md:flex-col justify-center items-center container">
        <p className="md:hidden space-x-4 font-bold text-[8.5dvw] text-center text-nowrap">
          <span>{t('common.holding')}</span>
          <span>{t('common.company')}</span>
        </p>

        <BreathingText staggerFrom="first" className="max-md:hidden text-[8.2dvw] text-center text-nowrap">
          {t('common.holding')}
        </BreathingText>

        <Image
          src="/images/logos/eagroup-logo.webp"
          alt="EA Group Logo"
          width={400}
          height={400}
          sizes="10dvw"
          className="w-1/2 h-auto object-contain invert md:scale-125"
        />

        <BreathingText staggerFrom="last" className="max-md:hidden text-[8.2dvw] text-center text-nowrap">
          {t('common.company')}
        </BreathingText>
      </div>
    </section>
  )
}
