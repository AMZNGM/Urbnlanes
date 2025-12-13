import BackBtn from '@/components/ui/buttons/BackBtn'
import CloseBtn from '@/components/ui/buttons/CloseBtn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import MenuIcon from '@/components/ui/buttons/MenuIcon'
import TextAnimation from '@/components/ui/text/TextAnimation'
import TextRoll from '@/components/ui/text/TextRoll'

export default function Home() {
  return (
    <div className="relative w-screen min-h-screen h- [300vh] flex flex-col justify-center items-center text-7xl">
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]"></div> */}
      <TextAnimation text={`Urbnlanes wwwwWW`} />
      <TextRoll>Hover me</TextRoll>
      <MainBtn>not-found</MainBtn>
      <MenuIcon />
    </div>
  )
}
