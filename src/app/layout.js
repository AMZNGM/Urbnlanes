import './globals.css'
import AppWrapper from '@/components/app-components/AppWrapper'

export const metadata = {
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
        className={`relative w-screen min-h-screen overflow-x-hidden! bg-bg text-text uppercase selection:bg-main/50 selection:text-text scroll-smooth antialiased`}
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
