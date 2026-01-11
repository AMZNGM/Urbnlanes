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
    <div className="relative w-full h-full overflow-hidden bg-black font-mono text-main px-18 max-md:px-4">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-full flex max-md:flex-col md:justify-between items-center max-md:translate-y-25">
          <ShinyText tag="h4" className="text-[16vw] text-center leading-[13vw]">
            <p className="font-sec font-medium tracking-[1.2vw]">urbn</p>
            <p className="font-main font-light">lanes</p>
          </ShinyText>

          <div className="relative w-full overflow-hidden">
            <div className="overflow-hidden">
              <div className="overflow-hidden flex justify-end">
                <div className="flex flex-col justify-end gap-2 text-xs">
                  <motion.span initial={{ x: '-100%' }} whileInView={{ x: 0 }} transition={{ duration: 0.75, delay: 0.3 }}>
                    {db.metadata.company.parentCompany || 'Emeel Abdalla Investments'}
                  </motion.span>

                  <motion.span initial={{ x: '-100%' }} whileInView={{ x: 0 }} transition={{ duration: 0.75, delay: 0.4 }}>
                    taxreg: {db.metadata.company.taxreg || '177176'}
                  </motion.span>
                </div>

                <div className="w-full space-y-4 text-end">
                  {links.map((link, index) => (
                    <motion.nav
                      initial={{ x: '100%' }}
                      whileInView={{ x: 0 }}
                      transition={{ duration: 0.75, delay: index * 0.1 }}
                      key={index}
                      className="space-y-2"
                    >
                      <Link href={link.href} className="block hover:text-text text-sm transition-all duration-300">
                        {link.name}
                      </Link>
                    </motion.nav>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="w-full h-px bg-linear-to-r from-transparent via-main to-transparent my-8"
            />

            <div className="overflow-hidden">
              <div className="flex max-md:flex-col justify-between items-center gap-18">
                <div className="w-full space-y-2 opacity-60 text-xs max-md:text-end">
                  <motion.p initial={{ x: '-100%' }} whileInView={{ x: 0 }} transition={{ duration: 0.75, delay: 0.3 }} className="m-0">
                    © {db.metadata.company.name || 'Emeel Abdalla Investments'} {new Date().getFullYear()}
                  </motion.p>

                  <motion.p
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.75, delay: 0.4 }}
                    className="text-xs m-0 md:mt-0"
                  >
                    All rights reserved.
                  </motion.p>
                </div>

                <div className="flex justify-center items-center gap-4">
                  {Object.entries(db.contact.socialMedia).map(([platform, url], index) => {
                    const icons = {
                      facebook: Facebook,
                      linkedin: Linkedin,
                      youtube: Youtube,
                      instagram: Instagram,
                    }
                    const Icon = icons[platform]

                    if (!Icon || !url) return null

                    return (
                      <motion.div
                        key={platform}
                        initial={{ y: '-120%', opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                      >
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-main hover:text-text transition-colors duration-300"
                          aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                        >
                          <Icon size={20} />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row-reverse max-md:flex-col justify-center items-center gap-8 mb-12">
          <div className="flex justify-end items-center gap-8 text-xs">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((link) => (
              <Link
                key={link}
                href={`/${link.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-main hover:text-text transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </div>

          <p className="opacity-75 text-xs text-center">
            This site is protected by reCAPTCHA and the Google{' '}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text underline transition-colors duration-200"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text underline transition-colors duration-200"
            >
              Terms of Service
            </Link>{' '}
            apply.
          </p>
        </div>
      </div>
    </div>
  )
}
