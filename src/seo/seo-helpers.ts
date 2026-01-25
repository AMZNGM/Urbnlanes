import { SEO } from '@/seo/seo.config'

export function createMetadataGenerator(route: string) {
  return function generateMetadata() {
    const seoData = (SEO as Record<string, any>)[route] || {}

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
  ourProjects: createMetadataGenerator('/projects'),
  mediaCenterNews: createMetadataGenerator('/media-center-news'),
  partnersAssociates: createMetadataGenerator('/partners-associates'),
  constructionUpdates: createMetadataGenerator('/construction-updates'),
  careers: createMetadataGenerator('/careers'),
  cookiePolicy: createMetadataGenerator('/cookie-policy'),
  privacyPolicy: createMetadataGenerator('/privacy-policy'),
  termsOfUse: createMetadataGenerator('/terms-of-use'),
  getInTouch: createMetadataGenerator('/get-in-touch'),
  notFound: createMetadataGenerator('/*'),
  project: (data: any) => ({
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: data.alternates,
  }),
}
