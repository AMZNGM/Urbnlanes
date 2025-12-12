import Link from 'next/link'
import Image from 'next/image'
import { CircularBuildingBG } from '@/data/media-data/media-imports'
import MainBtn from '@/components/ui/buttons/MainBtn'
import { HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-bg text-text flex flex-col gap-8 justify-center items-center py-24 px-4 z-50">
      <Image
        src={CircularBuildingBG}
        alt="404"
        fill
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-30 pointer-events-none"
      />

      {/* <Link
        href=""
        className="flex justify-center items-center gap-2 text-center outline-none bg-text hover:bg-main/75 hover:border-transparent duration-300 px-4 py-2"
      >
        <HomeIcon className="size-5" />
        Go Back Home
      </Link> */}

      <MainBtn to={''} variant="outline">
        Go Back Home
        <HomeIcon className="size-5" />
      </MainBtn>

      <div className="flex flex-col gap-8 text-center hidden">
        <div className="space-y-4">
          <h1 className="font-normal">Our Apologies</h1>
          <h3 className="text-3xl font-medium">It seems you have reached a page that does not exist.</h3>
          <p className="text-lg font-normal">Either the page is not available, or the address (URL) you have entered is incorrect.</p>
        </div>

        <div className="space-y-4 font-arab">
          <h2 className="font-normal">نأسف</h2>
          <h3 className="text-4xl font-medium">الصفحة المطلوبة غير موجودة</h3>
          <p className="text-lg font-normal">قد يكون سبب المشكلة أن الصفحة غير متاحة، أو أن رابط الصفحة الذي أدخلته غير صحيح</p>
        </div>
      </div>
    </section>
  )
}
