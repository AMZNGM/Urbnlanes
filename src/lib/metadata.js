import { SEO } from '@/config/seo.config'

export function generateMetadata({ params }) {
  let slug = ''

  if (params?.slug) {
    slug = '/' + params.slug.join('/')
  } else {
    slug = '/'
  }

  const seoData = SEO[slug] || {}

  return {
    title: seoData.title || 'Urbnlanes Developments | Building Masterpieces',
    description: seoData.description || 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
    keywords: seoData.keywords || [],
    openGraph: {
      title: seoData.title || 'Urbnlanes Developments | Building Masterpieces',
      description: seoData.description || 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
      type: 'website',
      url: `https://urbnlanes.com${slug}`,
      images: [
        {
          url: '/images/FromTheSky.webp',
          width: 1200,
          height: 630,
          alt: seoData.title || 'Urbnlanes Developments',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title || 'Urbnlanes Developments | Building Masterpieces',
      description: seoData.description || 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
      images: ['/images/FromTheSky.webp'],
    },
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
}

export function generateStaticMetadata(slug) {
  return generateMetadata({ params: { slug: slug.replace(/^\//, '').split('/') } })
}
