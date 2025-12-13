import { SEO } from '@/config/seo.config'

/**
 * Creates a metadata generator function for a specific route
 * @param {string} route - The route path (e.g., '/about', '/projects/latest-launches')
 * @returns {Function} - A function that generates metadata for the given route
 */
export function createMetadataGenerator(route) {
  return function generateMetadata() {
    const seoData = SEO[route] || {}

    return {
      title: seoData.title || 'Urbnlanes Developments | Building Masterpieces',
      description: seoData.description || 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
      openGraph: {
        title: seoData.title || 'Urbnlanes Developments | Building Masterpieces',
        description: seoData.description || 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
        type: 'website',
        url: `https://urbnlanes.com${route}`,
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
}

/**
 * Pre-defined metadata generators for common routes
 */
export const metadataGenerators = {
  home: createMetadataGenerator('/'),
  about: createMetadataGenerator('/about'),
  latestLaunches: createMetadataGenerator('/projects/latest-launches'),
  storyBrandedResidences: createMetadataGenerator('/projects/story-branded-residences'),
  noi: createMetadataGenerator('/projects/noi'),
  midlane: createMetadataGenerator('/projects/midlane'),
  yellowLane: createMetadataGenerator('/projects/yellow-lane'),
  yellowResidence: createMetadataGenerator('/projects/yellow-residence'),
  eastlane: createMetadataGenerator('/projects/eastlane'),
  levelsBusinessTower: createMetadataGenerator('/projects/levels-business-tower'),
  ourProjects: createMetadataGenerator('/projects/our-projects'),
  mediaCenterNews: createMetadataGenerator('/media-center-news'),
  partnersAssociates: createMetadataGenerator('/partners-associates'),
  constructionUpdates: createMetadataGenerator('/construction-updates'),
  careers: createMetadataGenerator('/careers'),
  contactUs: createMetadataGenerator('/contact-us'),
  cookiePolicy: createMetadataGenerator('/cookie-policy'),
  privacyPolicy: createMetadataGenerator('/privacy-policy'),
  termsOfUse: createMetadataGenerator('/terms-of-use'),
}
