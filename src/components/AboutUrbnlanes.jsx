'use client'

import { useTranslation } from '@/hooks/useTranslation'
import SplitText from '@/components/ui/text/SplitText'

export default function AboutUrbnlanes() {
  const { t } = useTranslation()

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-4 py-24">
      <div className="w-full max-w-5xl h-full flex flex-col justify-center items-center gap-4 text-center mx-auto">
        <SplitText as="h3" className="overflow-y-hidden text-5xl">
          {t('common.aboutUs')}
        </SplitText>

        <SplitText as="p" stagger="0.01" className="text-black/65 text-2xl normal-case">
          {t('db.whoweare.description2')}
        </SplitText>
      </div>
    </section>
  )
}
