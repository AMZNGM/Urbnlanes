import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/logos/urbnlanes-logo.webp'

export default function NavLogo() {
  return (
    <Link href="/" aria-label="Urbnlanes home" title="Logo" className="inline-flex relative items-center outline-none select-none">
      <Image
        src={logo}
        alt="Urbnlanes"
        priority
        className="w-fit h-8 object-contain hover:scale-103 transition-transform duration-300 ease-out"
      />
    </Link>
  )
}
