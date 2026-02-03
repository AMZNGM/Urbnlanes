import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/logos/urbnlanes-logo.webp'

export default function NavLogo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Urbnlanes home" title="Urbnlanes Logo" className={`${className}`}>
      <Image src={logo} alt="Urbnlanes" priority sizes="(max-width: 768px) 150px, 180px" className="w-full object-contain" />
    </Link>
  )
}
