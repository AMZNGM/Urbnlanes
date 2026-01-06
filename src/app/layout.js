import './globals.css'
import AppWrapper from '@/components/app-components/AppWrapper'

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`relative w-full h-full bg-bg text-text font-main uppercase selection:bg-main/75 selection:text-text scroll-smooth antialiased md:subpixel-antialiased`}
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
