import ProgressCarousel from '@/components/ui/ProgressCarousel'

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg text-text">
      {/* <div className="top-0 right-0 bottom-0 left-0 absolute bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)]" />{' '} */}
      <ProgressCarousel />
    </div>
  )
}
