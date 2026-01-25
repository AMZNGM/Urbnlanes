import Image from 'next/image'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function TextPanel({ className = '', paraClassName = '', imageClassName = '', title = '', para = '', image = '' }) {
  return (
    <section className={`relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-24 ${className}`}>
      {image && (
        <Image
          src={image}
          alt="BackGround Image"
          fill
          sizes="20dvw"
          className={`z-0 absolute inset-0 object-cover opacity-40 ${imageClassName}`}
        />
      )}

      <div className="z-10 relative w-full max-w-5xl h-full flex flex-col justify-center items-center gap-4 text-center mx-auto">
        {title && (
          <div data-scroll data-scroll-speed="0.02">
            <AnimText as="h2" className="font-sec text-4xl text-center rtl:leading-12 mb-12">
              <TText tKey={title} />
            </AnimText>
          </div>
        )}

        {para && (
          <div data-scroll data-scroll-speed="0.05" className="max-w-4xl space-y-6 text-center mx-auto">
            <AnimText as="p" className={`opacity-80 text-lg ${paraClassName}`}>
              <TText tKey={para} />
            </AnimText>
          </div>
        )}
      </div>
    </section>
  )
}
