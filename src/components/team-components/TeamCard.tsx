import TText from '@/translations/TText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimText from '@/components/ui/unstyled/AnimText'

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
      <ImageIn
        src={member.image}
        alt={member.name}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        divClassName="aspect-3/4 overflow-hidden bg-main/5 rounded-lg"
      />

      <div className="flex flex-col gap-1">
        <AnimText as="h3" className="font-sec text-xl tracking-tight">
          <TText tKey={`team.members.${member.id}.name`} />
        </AnimText>

        <AnimText as="p" className="opacity-60 text-sm normal-case tracking-widest">
          <TText tKey={`team.members.${member.id}.position`} />
        </AnimText>
      </div>
    </div>
  )
}
