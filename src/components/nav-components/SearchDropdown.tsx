import Image from 'next/image'
import { SearchResult } from '@/hooks/useSearch'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { ArrowRight, FileText, Newspaper, Building2 } from 'lucide-react'

let CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Projects':
      return <Building2 size={14} className="text-blue-500" />
    case 'News':
      return <Newspaper size={14} className="text-green-500" />
    case 'Pages':
      return <FileText size={14} className="text-gray-500" />
    default:
      return <ArrowRight size={14} />
  }
}

export default function SearchDropdown({
  results,
  selectedIndex,
  onSelect,
  onHover,
}: {
  results: SearchResult[]
  selectedIndex: number
  onSelect: (result: SearchResult) => void
  onHover: (index: number) => void
}) {
  useBodyScrollLock(true)

  let groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) acc[result.category] = []
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, SearchResult[]>
  )

  if (results.length === 0) {
    return <div className="z-50 w-full bg-bg/50 border rounded-2xl text-center p-4">No results found.</div>
  }

  let globalIndex = 0

  return (
    <search
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="max-h-[60dvh] overflow-y-auto bg-bg/50 border rounded-2xl outline-none"
    >
      <ul>
        {Object.entries(groupedResults).map(([category, items]) => (
          <li key={category} className="mb-2 last:mb-0">
            <h5 className="top-0 z-10 sticky bg-bg/95 backdrop-blur-sm border-text/5 border-b font-medium text-text/40 text-xs uppercase tracking-widest px-4 py-2">
              {category}
            </h5>

            <ul>
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
                      className={`relative flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors duration-100 ${isSelected ? 'bg-text/15' : 'hover:bg-text/15'}`}
                    >
                      <div className="w-12 h-12 overflow-hidden flex justify-center items-center bg-text/5 rounded-lg shrink-0">
                        {result.image ? (
                          <Image src={result.image} alt={result.title} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <CategoryIcon category={result.category} />
                        )}
                      </div>

                      <div className="min-w-0 flex justify-between items-center gap-2 mb-1 grow">
                        <div className="max-w-[80%] space-y-0.5">
                          <h4 className="font-semibold text-sm truncate">{result.title}</h4>
                          {result.description && <p className="text-text/60 text-xs truncate line-clamp-1">{result.description}</p>}
                        </div>

                        <div className="flex justify-center items-center gap-1">
                          <span className="opacity-50 border rounded-full text-[10px] tracking-wider px-1.5 py-0.5">{result.category}</span>
                          {isSelected && <ArrowRight size={16} className="text-main" />}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </search>
  )
}
