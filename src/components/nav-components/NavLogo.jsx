import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/Urbnlanes-Logo.webp'

export default function NavLogo() {
  return (
    <Link href={'/'} aria-label="Urbnlanes home" className="relative inline-flex items-center select-none outline-none">
      <Image
        src={logo}
        alt="Urbnlanes"
        priority={true}
        className="h-10 max-md:h-8 w-auto object-contain transition-transform duration-300 ease-out hover:scale-103"
      />
    </Link>
  )
}
