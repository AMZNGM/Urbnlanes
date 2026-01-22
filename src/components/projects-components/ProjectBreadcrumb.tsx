import Link from 'next/link'
import { Project } from '@/types/project'
import { ChevronRight } from 'lucide-react'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/text/AnimText'

export default function ProjectBreadcrumb({ project }: { project: Project }) {
  return (
    <nav className="relative w-full bg-text border-black border-b text-black px-18 max-md:px-4 py-6">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="hover:text-main transition-colors">
          <AnimText delay={0.2}>
            <TText tKey="nav.home" />
          </AnimText>
        </Link>

        <ChevronRight size={16} className="rtl:rotate-180" />

        <Link href="/our-projects" className="hover:text-main transition-colors">
          <AnimText delay={0.4}>
            <TText tKey="nav.projects" />
          </AnimText>
        </Link>

        <ChevronRight size={16} className="rtl:rotate-180" />

        <span className="font-medium">
          <AnimText delay={0.6}>
            <TText tKey={`db.projects.${project.id}.name`} />
          </AnimText>
        </span>
      </div>
    </nav>
  )
}
