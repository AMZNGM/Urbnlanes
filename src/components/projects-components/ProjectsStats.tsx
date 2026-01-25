import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectsStats({
  totalProjects,
  filteredProjects,
  categories,
  cities,
}: {
  totalProjects: number
  filteredProjects: number
  categories: number
  cities: number
}) {
  let stats = [
    { delay: 0.1, key: 'common.totalProjects', value: totalProjects },
    { delay: 0.2, key: 'common.filteredProjects', value: filteredProjects },
    { delay: 0.3, key: 'common.categories', value: categories },
    { delay: 0.4, key: 'common.cities', value: cities },
  ]

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-8">
      <div className="bg-main/25 rounded-2xl p-8">
        <AnimText as={'h2'} className="font-sec font-bold text-3xl text-center leading-12 mb-4">
          <TText tKey="common.projectStatistics" />
        </AnimText>

        <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
          {stats.map(({ delay, key, value }) => (
            <AnimIn key={key} delay={delay} className="bg-main/25 rounded-2xl text-center p-4">
              <AnimText className="opacity-50 font-bold text-4xl mb-2">{value}</AnimText>
              <AnimText delay={0.5} as={'p'} className="opacity-75 text-sm">
                <TText tKey={key} />
              </AnimText>
            </AnimIn>
          ))}
        </div>
      </div>
    </section>
  )
}
