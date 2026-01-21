import { Dispatch, SetStateAction } from 'react'
import TText from '@/translations/TText'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

export default function HeroVideoToggle({
  isVideoMode,
  setIsVideoMode,
}: {
  isVideoMode: boolean
  setIsVideoMode: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      dir="ltr"
      className="max-md:hidden top-38 max-md:top-28 right-18 max-md:right-4 z-30 absolute h-10 flex items-center gap-4 bg-black/25 hover:bg-black/50 backdrop-blur-lg border border-text/10 rounded-full transition-colors px-4"
    >
      <button
        onClick={() => setIsVideoMode(false)}
        className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4 ${
          !isVideoMode ? 'text-text' : 'text-main hover:text-text'
        }`}
      >
        <TText tKey="common.image" />
      </button>

      <SwitchBtn checked={isVideoMode} onChange={setIsVideoMode} className="w-10" />

      <button
        onClick={() => setIsVideoMode(true)}
        className={`text-xs font-medium tracking-wider transition-colors cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4 ${
          isVideoMode ? 'text-text' : 'text-main hover:text-text'
        }`}
      >
        <TText tKey="common.video" />
      </button>
    </div>
  )
}
