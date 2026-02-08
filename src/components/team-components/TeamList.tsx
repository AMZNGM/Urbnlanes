'use client'

import { useState } from 'react'
import { MotionLine } from '@/components/ui/effects/Lines'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import TeamCard from '@/components/team-components/TeamCard'
import TeamMemberModal from '@/components/team-components/TeamMemberModal'

export default function TeamList({ className, dark }: { className?: string; dark?: boolean }) {
  let teamMembers = db.team.slice(1)
  let [selectedMember, setSelectedMember] = useState<any>(null)

  return (
    <section className={`relative w-dvw min-h-dvh overflow-clip px-4 max-md:px-2 md:px-12 py-24 ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} ${className}`}>
      <div className="relative flex md:flex-row flex-col gap-12 lg:gap-24">
        {/* Left side */}
        <div className="md:top-32 md:sticky md:w-1/3 h-fit flex flex-col gap-12">
          <AnimIn className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <AnimText as="p" className="text-main text-sm leading-normal tracking-[0.15em]">
                <TText tKey="team.header.tagline" />
              </AnimText>

              <AnimText as="h2" className="text-5xl rtl:leading-normal!">
                <TText tKey="team.header.title" />
              </AnimText>
            </div>

            <MotionLine from="left" />

            <div className="flex flex-col gap-4">
              <AnimText as="h3" className="opacity-80 text-xl leading-normal tracking-widest">
                <TText tKey="db.whoweare.teamOfExperts.title" />
              </AnimText>

              <AnimText as="p" className="text-main text-sm lg:text-base normal-case text-balance leading-normal">
                <TText tKey="db.whoweare.teamOfExperts.description" />
              </AnimText>
            </div>
          </AnimIn>
        </div>

        {/* Right side */}
        <div className="md:w-2/3">
          <div className="gap-x-8 gap-y-16 grid grid-cols-1 lg:grid-cols-2">
            {teamMembers.map((member: any, index: number) => (
              <AnimIn delay={index * 0.1} key={member.id}>
                <TeamCard member={member} onClick={() => setSelectedMember(member)} />
              </AnimIn>
            ))}
          </div>
        </div>
      </div>

      <TeamMemberModal selectedMember={selectedMember} closeModal={() => setSelectedMember(null)} />
    </section>
  )
}
