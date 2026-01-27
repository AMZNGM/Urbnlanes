import Link from 'next/link'
import { Project } from '@/types/project'
import { ChevronRight } from 'lucide-react'
import { MotionLine } from '@/components/ui/effects/Lines'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectBreadcrumb({ project }: { project: Project }) {
  return (
    <nav className="relative w-full bg-text text-black py-6">
      <div className="flex items-center gap-2 text-sm px-18 max-md:px-4">
        <Link href="/" className="hover:text-main transition-colors">
          <AnimText delay={0.2}>
            <TText tKey="nav.home" />
          </AnimText>
        </Link>

        <ChevronRight size={16} className="rtl:rotate-180" />

        <Link href="/projects" className="hover:text-main transition-colors">
          <AnimText delay={0.4}>
            <TText tKey="common.allProjects" />
          </AnimText>
        </Link>

        <ChevronRight size={16} className="rtl:rotate-180" />

        <span className="font-medium cursor-default">
          <AnimText delay={0.6}>
            <TText tKey={`db.projects.${project.id}.name`} />
          </AnimText>
        </span>
      </div>

      <MotionLine className="translate-y-4" />
    </nav>
  )
}
