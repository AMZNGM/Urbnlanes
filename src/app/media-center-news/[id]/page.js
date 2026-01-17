// import { useParams } from 'next/navigation'
// import SingleArticle from '@/components/SingleArticle'

import { metadataGenerators } from '@/lib/seo-helpers'
export const generateMetadata = metadataGenerators.mediaCenterNews()

export default function ArticlePage() {
  // const params = useParams()
  // const articleId = parseInt(params.id, 10)

  // return <SingleArticle articleId={articleId} preloadedImage={null} />
  return <div>ngm</div>
}
