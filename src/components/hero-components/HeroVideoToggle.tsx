import { Dispatch, SetStateAction } from 'react'
import TText from '@/translations/TText'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

export default function HeroVideoToggle({ isVideoMode, setIsVideoMode }: { isVideoMode: boolean; setIsVideoMode: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div
      dir="ltr"
      className="max-md:hidden top-2 right-36 z-60 absolute overflow-hidden space-x-4 bg-main/25 hover:bg-bg/50 backdrop-blur-2xl rounded-full transition-colors px-4 py-0.5 select-none"
    >
      <button
        onClick={() => setIsVideoMode(false)}
        className={`text-xs font-medium tracking-wider transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4 ${
          !isVideoMode ? 'text-text' : 'text-text/60 hover:text-text'
        }`}
      >
        <TText tKey="common.image" />
      </button>

      <SwitchBtn checked={isVideoMode} onChange={setIsVideoMode} className="w-10" />

      <button
        onClick={() => setIsVideoMode(true)}
        className={`text-xs font-medium tracking-wider transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-4 ${
          isVideoMode ? 'text-text' : 'text-text/60 hover:text-text'
        }`}
      >
        <TText tKey="common.video" />
      </button>
    </div>
  )
}
