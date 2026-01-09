'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react'
import { useNavbar } from '@/hooks/useNavbar'
import { useTranslation } from '@/hooks/useTranslation'
import { navigation } from '@/config/navigation.ui.json'
import db from '@/database/urbnlanes-db.json'
import ShinyText from '@/components/ui/text/ShinyText'

export default function FooterContent() {
  const { t } = useTranslation()
  const { isClient } = useNavbar()

  const links = useMemo(() => {
    return navigation
      .flatMap((item) => {
        if (item.slug) {
          return { href: item.slug, name: isClient ? t(item.name) : item.name }
        } else if (item.children) {
          return item.children.map((child) => ({
            href: child.slug,
            name: isClient ? t(child.name) : child.name,
          }))
        }
        return []
      })
      .filter((link) => link.href)
      .slice(1)
  }, [t, isClient])

  return (
    <div className="relative w-full h-full overflow-hidden bg-black font-mono text-main max-md:translate-y-56 px-18 max-md:px-4">
      <div className="w-full h-full flex max-md:flex-col md:justify-between items-center">
        <ShinyText tag="h4" className="text-[16vw] text-center leading-[12vw]">
          <p className="font-sec font-medium tracking-[1.2vw]">urbn</p>
          <p className="font-main font-light">lanes</p>
        </ShinyText>

        <div className="relative w-full overflow-hidden">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.75 }}
              className="overflow-hidden flex justify-end"
            >
              <div className="flex flex-col justify-end gap-2 text-xs">
                <span>{db.metadata.company.parentCompany || 'Emeel Abdalla Investments'}</span>

                <span>taxreg: {db.metadata.company.taxreg || '177176'}</span>
              </div>

              <div className="w-full space-y-4 text-end">
                <nav className="space-y-2">
                  {links.map((link, index) => (
                    <Link key={index} href={link.href} className="block hover:text-text text-sm transition-colors duration-300">
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-px bg-linear-to-r from-transparent via-main to-transparent my-8"
          />

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '-100%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex max-md:flex-col justify-between items-center gap-18"
            >
              <p className="w-full max-md:flex max-md:justify-between opacity-60 text-xs max-md:text-end">
                © {db.metadata.company.name || 'Emeel Abdalla Investments'} {new Date().getFullYear()}
                <span className="block text-xs md:mt-0">All rights reserved.</span>
              </p>

              <div className="flex justify-center items-center gap-4">
                {Object.entries(db.contact.socialMedia).map(([platform, url]) => {
                  const icons = {
                    facebook: Facebook,
                    linkedin: Linkedin,
                    youtube: Youtube,
                    instagram: Instagram,
                  }
                  const Icon = icons[platform]

                  if (!Icon || !url) return null

                  return (
                    <Link
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-main hover:text-text transition-colors duration-300"
                      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    >
                      <Icon size={20} />
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
