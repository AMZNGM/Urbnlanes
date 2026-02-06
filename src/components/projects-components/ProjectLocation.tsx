import { Project } from '@/types/project'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LineHeading from '@/components/shared/LineHeading'

export default function ProjectLocation({ project }: { project: Project }) {
  if (!project || !project.location) return null

  return (
    <section className="relative w-dvw overflow-hidden bg-text text-bg px-4 max-md:px-2 pb-12">
      <div className="max-w-6xl font-mono mx-auto">
        <LineHeading tKey="common.location" paraTKey="common.locationDesc" />

        <AnimIn className="gap-4 grid grid-cols-2 bg-main/25 rounded-lg mt-8 p-4">
          {Object.entries(project.location)
            .slice(0, 2)
            .map(([key, value]) => (
              <AnimIn key={key} delay={0.2 + Number(key) * 0.1} className="space-y-2 bg-main/25 rounded-xl p-4">
                <AnimText as={'p'} className="font-medium text-sm rtl:leading-5 tracking-wider">
                  <TText tKey={`common.${key}`} />
                </AnimText>

                <AnimText as={'p'} className="font-light text-2xl rtl:leading-8">
                  <TText tKey={`locations.${value}`} />
                </AnimText>

                <MotionLine className="opacity-50" />
              </AnimIn>
            ))}
        </AnimIn>
      </div>
    </section>
  )
}
