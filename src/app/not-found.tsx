import { metadataGenerators } from '@/seo/seo-helpers'
import MainBtn from '@/components/ui/buttons/MainBtn'

export const generateMetadata = metadataGenerators.notFound()

export default function NotFound() {
  return (
    <main className="relative w-full h-dvh bg-bg text-text">
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(/images/projects/east-lane/el-banner.avif)` }}>
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" />

        <div className="z-10 relative w-full h-full flex flex-col justify-center items-center gap-6 font-light text-center px-4 py-18">
          <section className="space-y-4">
            <h1 className="text-3xl">Our Apologies</h1>
            <h3 className="text-xl">It seems you have reached a page that does not exist.</h3>
            <p className="text-lg">Either the page is not available, or the address (URL) you have entered is incorrect.</p>
            <MainBtn to={'/'} look="ghost">
              Go Back Home
            </MainBtn>
          </section>

          <section className="space-y-4 font-arab text-text/80">
            <p className="text-lg">قد يكون سبب المشكلة أن الصفحة غير متاحة، أو أن رابط الصفحة الذي أدخلته غير صحيح</p>
            <h3 className="text-2xl">الصفحة المطلوبة غير موجودة</h3>
            <h2>نأسف</h2>
          </section>
        </div>
      </div>
    </main>
  )
}
