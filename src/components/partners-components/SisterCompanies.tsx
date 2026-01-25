import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function SisterCompanies() {
  return (
    <section className="relative w-dvw overflow-hidden bg-black text-text px-18 max-md:px-4 py-12">
      <AnimText as="h3" className="font-sec text-3xl mb-12">
        <TText tKey="common.sisCompanies" />
      </AnimText>

      <div className="gap-8 max-md:gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {db.whoweare.sisterCompanies.map((company, index) => (
          <AnimIn key={company.title} delay={0.1 * index} className="group">
            <div className="relative h-full overflow-hidden bg-main/25 group-hover:bg-main/50 rounded-2xl transition-all group-hover:-translate-y-2 duration-300 p-8">
              <ImageIn src={company.logo} alt={company.title} className="object-contain!" divClassName="h-16!" />
              <p className="text-sm text-center mt-4">{company.title}</p>
            </div>
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
