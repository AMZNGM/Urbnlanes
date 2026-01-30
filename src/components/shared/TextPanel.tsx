import Image from 'next/image'
import AnimText from '@/components/ui/unstyled/AnimText'
import TText from '@/translations/TText'

export default function TextPanel({ tKey = '', paraTKey = '', image = '', className = '', imageClassName = '' }) {
  return (
    <section className={`relative w-dvw overflow-hidden bg-text text-bg px-18 max-md:px-4 py-12 ${className}`}>
      {image && <Image src={image} alt="BackGround Image" fill sizes="20dvw" className={`z-0 absolute inset-0 object-cover opacity-30 ${imageClassName}`} />}

      <div className="z-10 relative w-full max-w-4xl h-full flex flex-col justify-center items-center gap-4 text-center mx-auto">
        {tKey && (
          <div data-scroll data-scroll-speed="0.02">
            <AnimText as="h2" className="font-sec text-4xl rtl:leading-12 mb-6">
              <TText tKey={tKey} />
            </AnimText>
          </div>
        )}

        {paraTKey && (
          <div data-scroll data-scroll-speed="0.05">
            <AnimText as="p" className={`max-w-4xl opacity-80 text-lg max-md:text-sm text-balance leading-relaxed mx-auto`}>
              <TText tKey={paraTKey} />
            </AnimText>
          </div>
        )}
      </div>
    </section>
  )
}
