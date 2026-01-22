import { Project } from '@/types/project'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/text/AnimText'

export default function ProjectLocation({ project }: { project: Project }) {
  if (!project || !project.location) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-black px-18 max-md:px-4 py-12">
      <AnimText as={'h2'} delay={0.9} className="font-sec font-medium text-xs tracking-widest">
        <TText tKey="common.location" />
      </AnimText>

      <MotionLine delay={1} />

      <AnimText as={'p'} delay={0.9} className="font-sec font-light rtl:text-xs">
        <TText tKey="common.locationDesc" />
      </AnimText>

      <AnimIn className="space-y-4 grid grid-cols-2 bg-main/25 rounded-2xl mt-8 p-4">
        <AnimIn delay={0.2} className="bg-main/25 rounded-2xl me-2 p-4">
          <p className="font-medium text-sm tracking-wider">
            <TText tKey="details.city" />
          </p>
          <p className="font-light text-2xl">
            <TText tKey={`locations.${project.location.city}`} />
          </p>
          <MotionLine className="opacity-50" />
        </AnimIn>

        <AnimIn delay={0.3} className="bg-main/25 rounded-2xl ms-2 p-4">
          <p className="font-medium text-sm tracking-wider">
            <TText tKey="details.country" />
          </p>
          <p className="font-light text-2xl">
            <TText tKey={`locations.${project.location.country}`} />
          </p>
          <MotionLine delay={0.5} className="opacity-50" />
        </AnimIn>

        {project.location.neighborhood && (
          <AnimIn delay={0.4} className="space-y-2 col-span-3 bg-main/25 rounded-2xl p-4">
            <p className="font-medium text-sm text-center tracking-wider">
              <TText tKey="details.area" />
            </p>
            <p className="max-w-2xl font-light text-center text-balance mx-auto">
              <TText tKey={`locations.${project.location.neighborhood}`} />
            </p>
            <MotionLine delay={0.9} className="opacity-50" />
          </AnimIn>
        )}
      </AnimIn>
    </section>
  )
}
