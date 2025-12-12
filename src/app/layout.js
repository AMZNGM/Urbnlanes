import './globals.css'
import AppWrapper from '@/components/app-components/AppWrapper'
// import LoadingScreen from '@/components/app-components/LoadingScreen'

export const metadata = {
  title: 'Urbnlanes Developments – Building Masterpieces',
  description:
    'Urbnlanes is a real estate development company, that operates under the umbrella of “Emeel Abdalla Investments”. With projects all over the Middle East, it is a company built on diversity and numerous years of experience in the field of real estate development.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`relative w-screen min-h-screen overflow-x-hidden! bg-bg text-text uppercase scroll-smooth antialiased`}>
        {/* <LoadingScreen /> */}
        {/* <AppWrapper>{children}</AppWrapper> */}
        {children}
      </body>
    </html>
  )
}
