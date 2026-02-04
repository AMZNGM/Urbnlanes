import { SearchResult } from '@/hooks/useGlobalSearch'
import { ArrowRight, FileText, Newspaper, Building2 } from 'lucide-react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

let CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'projects':
      return <Building2 size={14} className="text-blue-500" />
    case 'news':
      return <Newspaper size={14} className="text-green-500" />
    case 'pages':
      return <FileText size={14} className="text-amber-200" />
    default:
      return <ArrowRight size={14} className="text-gray-500" />
  }
}

export default function GlobalSearchDropdown({
  className = '',
  results,
  selectedIndex,
  onSelect,
  onHover,
  showCategoryHeaders = true,
}: {
  className?: string
  results: SearchResult[]
  selectedIndex: number
  onSelect: (result: SearchResult) => void
  onHover: (index: number) => void
  showCategoryHeaders?: boolean
}) {
  let groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) acc[result.category] = []
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, SearchResult[]>
  )

  if (results.length === 0) {
    return (
      <AnimText as={'p'} className="w-xl border-b font-mono leading-6! tracking-wider mb-3">
        <TText tKey="news.results0" />
      </AnimText>
    )
  }

  let globalIndex = 0

  return (
    <search
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className={`h-full w-xl overflow-y-auto overflow-x-hidden outline-none border-b mb-2
                [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-main/30 [&::-webkit-scrollbar-thumb:hover]:bg-main/50
         ${className}`}
    >
      {Object.entries(groupedResults).map(([category, items]) => (
        <li key={category} className="mb-2 last:mb-0">
          {showCategoryHeaders && (
            <h5 className="border-main/50! border-b font-mono font-medium text-main text-xs tracking-widest mb-1 py-2">
              <TText tKey={`search.${category}`} />
            </h5>
          )}

          {items.map((result) => {
            let currentIndex = globalIndex++
            let isSelected = selectedIndex === currentIndex

            return (
              <div
                key={`${result.category}-${result.id}`}
                data-index={currentIndex}
                onClick={() => onSelect(result)}
                onMouseEnter={() => onHover(currentIndex)}
              >
                <div
                  className={`group relative flex items-center rounded-xl gap-4 py-2 cursor-pointer transition-colors duration-100 ${
                    isSelected ? 'text-text' : 'text-text/60 hover:text-text'
                  }`}
                >
                  <div className="w-22 h-16 overflow-hidden flex justify-center items-center bg-bg/25 rounded-lg shrink-0">
                    {result.image ? (
                      <ImageIn src={result.image} alt={result.title} divClassName="w-full group-hover:scale-120 transition-transform duration-500" />
                    ) : (
                      <CategoryIcon category={result.category} />
                    )}
                  </div>

                  <div className="min-w-0 flex justify-between items-center gap-2 me-4 mb-1 grow">
                    <div className="max-w-[80%] space-y-0.5">
                      <AnimText as={'h4'} className="font-medium text-sm truncate normal-case">
                        {result.title}
                      </AnimText>
                      {/* {result.descri  ption && <p className="text-text/60 text-xs truncate normal-case line-clamp-1">{result.description}</p>} */}

                      <AnimText as={'span'} delay={0.2} className="font-mono text-[10px] capitalize tracking-wider">
                        {result.category}
                      </AnimText>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </li>
      ))}
    </search>
  )
}
