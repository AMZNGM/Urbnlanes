import TText from '@/translations/TText'
import SwitchBtn from '@/components/ui/buttons/SwitchBtn'

export default function ViewToggle({ viewMode, onToggleView, className = '' }: { viewMode: 'grid' | 'list'; onToggleView: () => void; className?: string }) {
  return (
    <div className={`relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-4 flex justify-end items-center gap-3 ${className}`}>
      <span onClick={onToggleView} className={`text-sm transition-colors cursor-pointer ${viewMode === 'list' ? 'text-black' : 'opacity-75'}`}>
        <TText tKey="common.listView" />
      </span>

      <SwitchBtn
        checked={viewMode === 'grid'}
        onChange={(checked) => {
          if (checked !== (viewMode === 'grid')) {
            onToggleView()
          }
        }}
        aria-label="Toggle view mode"
      />

      <span onClick={onToggleView} className={`text-sm transition-colors cursor-pointer ${viewMode === 'grid' ? 'text-black' : 'opacity-75'}`}>
        <TText tKey="common.gridView" />
      </span>
    </div>
  )
}
