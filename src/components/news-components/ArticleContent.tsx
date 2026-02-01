import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function ArticleContent({ article }: { article: any }) {
  let images = Array.isArray(article.image) ? article.image : [article.image]
  let contents = Array.isArray(article.content) ? article.content : [article.content]
  let filteredContents = contents.filter((paragraph: string) => {
    let isLink = typeof paragraph === 'string' && (paragraph.trim().startsWith('http://') || paragraph.trim().startsWith('https://'))
    return !isLink
  })
  let additionalImages = images.slice(1)
  let imageInterval = additionalImages.length > 0 ? Math.floor(filteredContents.length / (additionalImages.length + 1)) : 0

  return (
    <main className="relative w-dvw overflow-hidden bg-text text-bg px-8 max-md:px-2 py-24 max-md:py-12">
      <section className="z-10 max-w-4xl mx-auto">
        {filteredContents.map((paragraph: string, index: number) => {
          let imageIndex = Math.floor((index + 1) / imageInterval) - 1
          let shouldShowImage = imageInterval > 0 && (index + 1) % imageInterval === 0 && imageIndex >= 0 && imageIndex < additionalImages.length
          let aspectRatios = ['aspect-video', 'aspect-5/5', 'aspect-7/5']
          let aspectRatio = aspectRatios[imageIndex % aspectRatios.length]

          return (
            <div key={index}>
              <AnimIn delay={0.1 * index} className="text-lg md:text-2xl normal-case leading-relaxed mb-8">
                {paragraph}
              </AnimIn>

              {shouldShowImage && (
                <figure className="w-full my-12">
                  <ImageIn
                    src={additionalImages[imageIndex] as string}
                    alt={`${article.title} - Image ${imageIndex + 2}`}
                    divClassName={`relative ${aspectRatio} hover:aspect-video transition-all duration-700 ease-in-out overflow-hidden rounded-xl`}
                  />
                </figure>
              )}
            </div>
          )
        })}

        <AnimIn className="flex flex-col justify-between items-center gap-8 mt-8">
          {article.source && (
            <a href={article.source} target="_blank" rel="noopener noreferrer" className="text-xl hover:underline tracking-widest">
              View Original Source
            </a>
          )}

          {/* <button
            onClick={() => {
              if (typeof window !== 'undefined' && navigator.share) {
                navigator.share({
                  title: article.title,
                  url: window.location.href,
                })
              }
            }}
            className="bg-text!"
          >
            <Share2 />
          </button> */}
        </AnimIn>
      </section>
    </main>
  )
}
