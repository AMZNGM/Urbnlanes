import Image from 'next/image'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/text/AnimText'

export default function TextPanel({ className = '', paraClassName = '', imageClassName = '', title = '', para = '', image = '' }) {
  return (
    <section className={`relative w-dvw overflow-hidden bg-text text-black px-4 py-24 ${className}`}>
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
            <AnimText as="h3" className="overflow-y-hidden text-5xl rtl:leading-14">
              <TText tKey={title} />
            </AnimText>
          </div>
        )}

        {para && (
          <div data-scroll data-scroll-speed="0.05">
            <AnimText as="p" stagger={0.01} className={`text-2xl normal-case opacity-60 ${paraClassName}`}>
              <TText tKey={para} />
            </AnimText>
          </div>
        )}
      </div>
    </section>
  )
}
