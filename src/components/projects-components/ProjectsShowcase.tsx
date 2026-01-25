import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function ProjectsShowcase() {
  const featuredProjects = [
    { id: 'east-lane', name: 'Eastlane', hasMap: true },
    { id: 'levels-business-tower', name: 'Levels Business Tower', hasMap: true },
    { id: 'noi', name: 'NOI', hasMap: false },
    { id: 'mid-lane', name: 'Midlane', hasMap: false },
    { id: 'yellow-lane', name: 'Yellow residence', hasMap: false },
  ]

  const kuwaitProjects = [
    'Three administrative buildings in Sheraton district, Maadi and Mokattam',
    'Hessa Mubarak Towers',
    'Levels Tower - Kuwait',
    'Grand Park Towers',
    'Grand Sea Towers',
    'Shaza Hotel',
    'Complex Tower',
    'Injazat Tower',
    'Omniyat Gardens',
    'Dalal Complex',
    'Porto Salmiya',
    'Prestige Luxury Appartments Tower',
    'Prime Tower',
    'AUM University',
    'West Abdalla Mubarak City',
    'Al Khalid Tower',
    'Kuwait Finance House Complex',
    'Kuwait Car Showroom',
  ]

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <div className="text-center mb-16">
          <AnimText as="h2" className="font-sec text-4xl mb-6">
            Architectural Excellence
          </AnimText>
          <AnimText as="p" delay={0.2} className="max-w-4xl opacity-80 text-lg leading-relaxed mx-auto">
            We create architectural wonders and masterpieces for our clients. With our team of experts, carefully selected top-notch
            partners, and international experts, we deliver the best architectural projects for our clients.
          </AnimText>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <AnimText as="h3" className="font-sec text-2xl mb-8">
            Featured Projects
          </AnimText>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const projectData = db.projects.find((p) => p.id === project.id)
              return (
                <AnimIn key={project.id} delay={0.1 * index} className="group">
                  <div className="relative overflow-hidden bg-black rounded-xl text-text">
                    <div className="relative h-64">
                      <ImageIn
                        src={projectData?.gallery?.[0] || '/images/placeholder.webp'}
                        alt={project.name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="group-hover:scale-105 transition-transform duration-300"
                        divClassName="absolute inset-0"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-sec font-bold text-xl mb-2">{project.name}</h4>
                      <div className="flex gap-2">
                        <MainBtn href={`/projects/${project.id}`} tKey="common.viewProject" size="sm" />
                        {project.hasMap && <MainBtn tKey="common.viewOnMap" size="sm" className="bg-gray-800 hover:bg-gray-700" />}
                      </div>
                    </div>
                  </div>
                </AnimIn>
              )
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <AnimText as="h3" className="font-sec text-2xl text-center mb-8">
            Our Impact
          </AnimText>
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
            <AnimIn delay={0.1} className="text-center">
              <div className="font-bold text-main text-4xl mb-2">36+</div>
              <p className="opacity-75 text-sm">Years of Experience</p>
            </AnimIn>
            <AnimIn delay={0.2} className="text-center">
              <div className="font-bold text-main text-4xl mb-2">100+</div>
              <p className="opacity-75 text-sm">Projects</p>
            </AnimIn>
            <AnimIn delay={0.3} className="text-center">
              <div className="font-bold text-main text-4xl mb-2">20+</div>
              <p className="opacity-75 text-sm">Towers on Ground</p>
            </AnimIn>
            <AnimIn delay={0.4} className="text-center">
              <div className="font-bold text-main text-4xl mb-2">18</div>
              <p className="opacity-75 text-sm">Kuwait Projects</p>
            </AnimIn>
          </div>
        </div>

        {/* Kuwait Projects List */}
        <div>
          <AnimText as="h3" className="font-sec text-2xl mb-8">
            Kuwait Portfolio
          </AnimText>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {kuwaitProjects.map((project, index) => (
              <AnimIn key={index} delay={0.05 * index} className="group">
                <div className="bg-black/10 hover:bg-black/20 rounded-lg transition-colors p-4">
                  <p className="opacity-80 group-hover:opacity-100 text-sm transition-opacity">{project}</p>
                </div>
              </AnimIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
