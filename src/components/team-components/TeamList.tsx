'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimText from '@/components/ui/unstyled/AnimText'
import TeamCard from './TeamCard'
import TeamMemberModal from './TeamMemberModal'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function TeamList({ className, dark }: { className?: string; dark?: boolean }) {
  let teamMembers = db.team.slice(1)
  let [selectedMember, setSelectedMember] = useState<any>(null)

  return (
    <section
      className={`relative w-dvw min-h-dvh overflow-hidden px-4 max-md:px-2 md:px-12 py-24 ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} ${className}`}
    >
      <div className="relative flex md:flex-row flex-col gap-12 lg:gap-24">
        {/* Left Sidebar (1/3) - Sticky/Parallax */}
        <div className="md:top-32 md:sticky md:w-1/3 h-fit flex flex-col gap-12">
          <motion.div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <AnimText as="p" className="font-mono text-main text-sm uppercase tracking-[0.3em]">
                <TText tKey="team.header.tagline" />
              </AnimText>
              <AnimText as="h2" className="font-sec text-5xl lg:text-7xl uppercase leading-tight">
                <TText tKey="team.header.title" />
              </AnimText>
            </div>

            <div className="w-12 h-px bg-current opacity-30" />

            <div className="flex flex-col gap-4">
              <AnimText as="h3" className="opacity-80 text-xl uppercase tracking-widest">
                <TText tKey="db.whoweare.teamOfExperts.title" />
              </AnimText>
              <AnimText as="p" className="opacity-60 font-mono text-sm lg:text-base text-balance leading-relaxed">
                <TText tKey="db.whoweare.teamOfExperts.description" />
              </AnimText>
            </div>
          </motion.div>

          {/* Decorative Parallax Element */}
          <motion.div className="hidden md:block -bottom-24 -left-12 absolute opacity-[0.03] font-sec text-[15vw] uppercase whitespace-nowrap pointer-events-none select-none">
            <TText tKey="db.metadata.company.title" />
          </motion.div>
        </div>

        {/* Right Content (2/3) - Member Grid */}
        <div className="md:w-2/3">
          <div className="gap-x-8 gap-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
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
