import FooterTitle from '@/components/footer-components/FooterTitle'
import LeftFooter from '@/components/footer-components/LeftFooter'
import FooterLinks from '@/components/footer-components/FooterLinks'
import FooterBottom from '@/components/footer-components/FooterBottom'
import Newsletter from '@/components/footer-components/Newsletter'

export default function FooterContent() {
  return (
    <div
      dir="ltr"
      data-scroll-container
      className="relative w-full h-full overflow-hidden bg-main font-mono text-bg px-18 max-md:px-4 max-md:pt-18 max-md:pb-32"
    >
      <div data-scroll data-scroll-speed="0.19" className="w-full h-full flex flex-col justify-between items-center md:translate-y-18">
        <div className="w-full h-full md:flex flex-col justify-center items-center">
          <FooterTitle />

          <div className="w-full flex justify-between max-md:mt-12">
            <LeftFooter />
            <FooterLinks />
          </div>
        </div>

        <div className="md:hidden">
          <Newsletter />
        </div>

        <FooterBottom />
      </div>
    </div>
  )
}
