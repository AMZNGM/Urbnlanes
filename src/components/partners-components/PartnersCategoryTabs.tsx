import MainBtn from '@/components/ui/buttons/MainBtn'

export default function PartnersCategoryTabs({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: 'all' | 'sister' | 'project'
  onCategoryChange: (category: 'all' | 'sister' | 'project') => void
}) {
  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text px-18 max-md:px-4 py-12">
      <div className="flex justify-center gap-4">
        <MainBtn
          size="lg"
          onClick={() => onCategoryChange('all')}
          className={`${selectedCategory === 'all' ? 'bg-main!' : 'bg-main/25! text-current! hover:bg-main/50'}`}
          tKey="common.allPartners"
        />

        <MainBtn
          size="lg"
          onClick={() => onCategoryChange('sister')}
          className={`${selectedCategory === 'sister' ? 'bg-main!' : 'bg-main/25! text-current! hover:bg-main/50'}`}
          tKey="common.sisCompanies"
        ></MainBtn>

        <MainBtn
          size="lg"
          onClick={() => onCategoryChange('project')}
          className={`${selectedCategory === 'project' ? 'bg-main!' : 'bg-main/25! text-current! hover:bg-main/50'}`}
          tKey="common.projectPartners"
        />
      </div>
    </section>
  )
}
