'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import db from '@/database/urbnlanes-db.json'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import CareerModal from '@/components/careers-components/CareerModal'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function CareersList({ className, dark }: { className?: string; dark?: boolean }) {
  let careersData = (db as any).careers
  let [selectedRole, setSelectedRole] = useState<any>(null)
  let [expandedDept, setExpandedDept] = useState<string | null>(null)

  if (!careersData) return null

  let toggle = (deptId: string) => {
    setExpandedDept(expandedDept === deptId ? null : deptId)
  }

  return (
    <section className={`relative w-dvw min-h-[90dvh] overflow-hidden px-4 max-md:px-2 py-24 ${dark ? 'bg-bg text-text' : 'bg-text text-bg'} ${className}`}>
      <div className="max-w-7xl mx-auto">
        <AnimText as={'h4'} className="rtl:leading-6!">
          <TText tKey="careers.openRoles" />
        </AnimText>

        {careersData.departments.map((dept: any, index: number) => {
          let isExpanded = expandedDept === dept.id
          return (
            <AnimIn delay={index * 0.1} key={dept.id} className="border-b">
              <button onClick={() => toggle(dept.id)} className="group w-full flex justify-between items-start gap-6 py-12 cursor-pointer">
                <div className="flex justify-between gap-4">
                  <span className="opacity-30 group-hover:opacity-100 font-mono text-[10px] group-hover:text-main transition-colors">0{index + 1}</span>
                  <h3 className="max-md:text-xl text-4xl">
                    <TText tKey={`careers.departments.${dept.id}`} />
                  </h3>
                </div>
                <div
                  className={`p-2 rounded-full border border-text/10 group-hover:border-main/30 group-hover:bg-main/5 transition-all duration-500 ease-[cubic-bezier(1,.9,.1,.8)] ${isExpanded ? 'rotate-180 bg-main/10 border-main/30' : ''}`}
                >
                  <ChevronDown size={20} className={isExpanded ? 'text-main' : 'opacity-40'} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-5xl gap-4 grid grid-cols-2 mx-auto px-4 pb-12">
                      {dept.roles.map((role: any, roleIndex: number) => (
                        <AnimIn blur delay={roleIndex * 0.05} key={role.id} onClick={() => setSelectedRole(role)}>
                          <div
                            className={`group/role flex justify-between bg-main/2 border border-main/15! hover:border-main/10! hover:rounded-br-[4rem] rounded-lg outline-none transition-all duration-500 p-4 cursor-pointer ${roleIndex % 2 === 1 ? '' : 'last:col-span-full'} `}
                          >
                            <div className="space-y-2 text-start">
                              <h4 className="group-hover/role:opacity-65 text-xl transition-opacity duration-300">
                                <TText tKey={`careers.roles.${role.id}.title`} />
                              </h4>
                              <p className="flex items-center gap-2 opacity-40 font-mono text-[10px] uppercase tracking-widest">{role.location}</p>
                            </div>
                            <ArrowUpRight size={18} className="opacity-20 group-hover/role:opacity-100 transition-opacity duration-300" />
                          </div>
                        </AnimIn>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimIn>
          )
        })}
      </div>

      <CareerModal selectedRole={selectedRole} closeModal={() => setSelectedRole(null)} />
    </section>
  )
}
