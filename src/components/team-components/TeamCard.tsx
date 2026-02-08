'use client'

import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import TText from '@/translations/TText'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  Autobiography?: string
}

export default function TeamCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group relative flex flex-col gap-4 cursor-pointer">
      <div className="relative aspect-3/4 overflow-hidden bg-main/5 rounded-lg">
        <ImageIn
          src={member.image}
          alt={member.name}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="flex flex-col gap-1">
        <AnimText as="h3" className="font-sec text-xl uppercase tracking-tight">
          <TText tKey={`team.members.${member.id}.name`} />
        </AnimText>
        <AnimText as="p" className="opacity-60 font-mono text-xs uppercase tracking-widest">
          <TText tKey={`team.members.${member.id}.position`} />
        </AnimText>
      </div>
    </div>
  )
}
