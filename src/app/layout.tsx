import './globals.css'
import { Cairo, Cinzel } from 'next/font/google'
import localFont from 'next/font/local'
import AppWrapper from '@/components/app-components/AppWrapper'

const fontMain = localFont({
  src: '../../public/fonts/GeneralSans-Variable.ttf',
  variable: '--font-main',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-sec',
  display: 'swap',
})

const fontArab = Cairo({
  subsets: ['latin'],
  variable: '--font-arab',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Urbnlanes Developments | Building Masterpieces',
  description:
    'Urbnlanes is a real estate development company, that operates under the umbrella of “Emeel Abdalla Investments”. With projects all over the Middle East, it is a company built on diversity and numerous years of experience in the field of real estate development.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontMain.variable} ${cinzel.variable} ${fontArab.variable}`}>
      <body
        suppressHydrationWarning
        className="relative w-full h-full bg-bg selection:bg-main/75 font-main text-text selection:text-text antialiased md:subpixel-antialiased uppercase scroll-smooth"
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
