import { SEO } from '@/config/seo.config'

export function createMetadataGenerator(route) {
  return function generateMetadata() {
    const seoData = SEO[route] || {}

    const metadata = {
      title: seoData.title || 'Urbnlanes Developments | Building Masterpieces',
      description: seoData.description || 'Urbnlanes is a real estate development company building masterpieces across the Middle East.',
      keywords: seoData.keywords || [],
    }

    return metadata
  }
}

export const metadataGenerators = {
  home: createMetadataGenerator('/'),
  about: createMetadataGenerator('/about'),
  storyBrandedResidences: createMetadataGenerator('/projects/story-branded-residences'),
  noi: createMetadataGenerator('/projects/noi'),
  midlane: createMetadataGenerator('/projects/midlane'),
  yellowLane: createMetadataGenerator('/projects/yellow-lane'),
  yellowResidence: createMetadataGenerator('/projects/yellow-residence'),
  eastlane: createMetadataGenerator('/projects/eastlane'),
  levelsBusinessTower: createMetadataGenerator('/projects/levels-business-tower'),
  ourProjects: createMetadataGenerator('/our-projects'),
  mediaCenterNews: createMetadataGenerator('/media-center-news'),
  partnersAssociates: createMetadataGenerator('/partners-associates'),
  constructionUpdates: createMetadataGenerator('/construction-updates'),
  careers: createMetadataGenerator('/careers'),
  contactUs: createMetadataGenerator('/contact-us'),
  cookiePolicy: createMetadataGenerator('/cookie-policy'),
  privacyPolicy: createMetadataGenerator('/privacy-policy'),
  termsOfUse: createMetadataGenerator('/terms-of-use'),
  getInTouch: createMetadataGenerator('/get-in-touch'),
  notFound: createMetadataGenerator('/*'),
}
