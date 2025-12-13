import { Suspense } from 'react'
import Hero from '@/components/Hero'

export const metadata = {
  title: 'Urbnlanes Developments | Building Masterpieces',
  description:
    'Urbnlanes is a real estate development company, that operates under the umbrella of “Emeel Abdalla Investments”. With projects all over the Middle East, it is a company built on diversity and numerous years of experience in the field of real estate development.',
  keywords: ['Urbnlanes Developments', 'Urbnlanes', 'Building Masterpieces', 'Building', 'Cairo', 'Egypt', 'Developments'],
  openGraph: {
    title: 'Urbnlanes Developments | Building Masterpieces',
    description:
      'Urbnlanes is a real estate development company, that operates under the umbrella of “Emeel Abdalla Investments”. With projects all over the Middle East, it is a company built on diversity and numerous years of experience in the field of real estate development.',
    type: 'website',
    url: 'https://urbnlanes.com/',
    images: [
      {
        url: '/public/images/FromTheSky.webp',
        width: 1200,
        height: 630,
        alt: 'Urbnlanes Developments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urbnlanes Developments | Building Masterpieces',
    description: 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
    images: ['/public/images/FromTheSky.webp'],
  },
}

function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
        <div className="bg-text/50 rounded-lg h-8 w-32"></div>
        <div className="bg-text/40 rounded-lg h-4 w-64"></div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <Hero />
      </Suspense>
    </>
  )
}
