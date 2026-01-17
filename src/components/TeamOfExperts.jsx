'use client'

import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import Heading from '@/components/ui/Heading'
import TextAnimation from '@/components/ui/text/TextAnimation'

export default function TeamOfExperts() {
  const { t } = useTranslation()

  return (
    <section className="relative w-full h-full overflow-hidden bg-black text-text px-4 py-8">
      <Heading text={t('db.whoweare.teamOfExperts.title')} />

      <div className="flex flex-col justify-center items-center gap-24 mt-18">
        <div className="items-center gap-12 grid md:grid-cols-2">
          <div className="relative h-96 overflow-hidden">
            <Image
              src="/images/leader.webp"
              alt="Award winning property"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <div>
            <TextAnimation
              text={t('db.whoweare.teamOfExperts.subtitle')}
              className="inline-block border border-main/60! rounded-xl text-xs uppercase tracking-[0.3em] mb-6 p-4"
            />

            <p className="text-balance leading-relaxed mb-8">{t('db.whoweare.teamOfExperts.description')}</p>

            <div className="flex max-md:justify-center items-center gap-8 text-main">
              <div className="text-center">
                <TextAnimation text={t('db.whoweare.statistics.yearsOfExperience')} className="font-sec text-3xl mb-1" />
                <TextAnimation text={t('common.yearsOfExperience')} className="text-xs uppercase tracking-wider" />
              </div>

              <div className="w-px h-12 bg-main/30" />

              <div className="text-center">
                <TextAnimation text={t('db.whoweare.statistics.workforce')} className="font-sec text-3xl mb-1" />
                <TextAnimation text={t('common.workforce')} className="text-xs uppercase tracking-wider" />
              </div>

              <div className="w-px h-12 bg-main/30" />

              <div className="text-center">
                <TextAnimation text={t('db.whoweare.statistics.landmarkProjects')} className="font-sec text-3xl mb-1" />
                <TextAnimation text={t('common.landmarkProjects')} className="text-xs uppercase tracking-wider" />
              </div>
            </div>
          </div>
        </div>

        <blockquote className="max-w-3xl font-sec text-main text-xl md:text-2xl text-center italic text-balance">
          "{t('db.whoweare.values.3.description')}"
        </blockquote>

        <div className="flex items-center gap-4 border px-8 py-4">
          <div className="w-12 h-12 flex justify-center items-center border">
            <div className="w-6 h-6 border rotate-45" />
          </div>

          <Image
            src="/images/logos/urbnlanes-logo.webp"
            alt="Urbnlanes logo"
            sizes="15vw"
            width={100}
            height={100}
            className="size-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}
