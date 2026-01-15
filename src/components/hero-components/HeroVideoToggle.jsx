'use client'

import SwitchBtn from '@/components/ui/buttons/SwitchBtn'
import { useTranslation } from '@/hooks/useTranslation'

export default function HeroVideoToggle({ isVideoMode, setIsVideoMode }) {
  const { t } = useTranslation()

  return (
    <div
      dir="ltr"
      className="max-md:hidden top-38 max-md:top-28 right-18 max-md:right-4 z-30 absolute h-10 flex items-center gap-4 bg-black/50 backdrop-blur-lg border border-text/10 rounded-full px-4"
    >
      <button
        onClick={() => setIsVideoMode(false)}
        className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 ${
          !isVideoMode ? 'text-text' : 'text-main hover:text-text'
        }`}
      >
        {t('common.image')}
      </button>

      <SwitchBtn checked={isVideoMode} onChange={setIsVideoMode} className="w-10" />

      <button
        onClick={() => setIsVideoMode(true)}
        className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 ${
          isVideoMode ? 'text-text' : 'text-main hover:text-text'
        }`}
      >
        {t('common.video')}
      </button>
    </div>
  )
}
