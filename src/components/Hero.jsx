import MainBtn from '@/components/ui/buttons/MainBtn'
import TextAnimation from '@/components/ui/text/TextAnimation'
import { AxeIcon } from 'lucide-react'
import TextRoll from './ui/text/TextRoll'

export default function Hero() {
  return (
    <div className="relative w-screen min-h-screen h-[300vh] flex flex-col justify-center items-center gap-12">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]" />
      <TextAnimation text={`Urbnlanes Developments Building Masterpieces`} classname="text-6xl text-center" />
      <MainBtn to="not-found">
        <TextRoll>not-found</TextRoll>
        <AxeIcon />
      </MainBtn>
    </div>
  )
}
