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
  const { t, currentLanguage } = useTranslation()
  const { isClient } = useNavbar()
  const isAr = currentLanguage === 'ar'

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

  const recaptchaParts = useMemo(() => {
    const text = t('footer.recaptcha', {
      privacy: 'PRIVACY_PLACEHOLDER',
      terms: 'TERMS_PLACEHOLDER',
    })
    return text.split(/(PRIVACY_PLACEHOLDER|TERMS_PLACEHOLDER)/)
  }, [t])

  return (
    <div
      dir="ltr"
      className="relative w-full h-full overflow-hidden bg-black font-mono text-main max-md:text-text px-18 max-md:px-4 max-md:py-18"
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-full flex max-md:flex-col md:justify-between items-center">
          <ShinyText className="text-[16vw] text-center leading-[13vw]">
            <p className="font-sec! font-medium tracking-[1.2vw]">urbn</p>
            <p className="font-main! font-light">lanes</p>
          </ShinyText>

          <div className="relative w-full overflow-hidden">
            <div className="overflow-hidden">
              <div className="overflow-hidden flex justify-end">
                <div className="flex flex-col justify-end gap-2 text-xs">
                  <motion.span
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.75, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {t('db.metadata.company.parentCompany')}
                  </motion.span>

                  <motion.span
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.75, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {t('footer.taxreg', { number: db.metadata.company.taxreg || '177176' })}
                  </motion.span>
                </div>

                <div className="w-full space-y-4 text-end">
                  {links.map((link, index) => (
                    <motion.nav
                      initial={{ x: '100%' }}
                      whileInView={{ x: 0 }}
                      transition={{ duration: 0.75, delay: index * 0.1 }}
                      viewport={{ once: true }}
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
                <div className="w-full space-y-2 md:opacity-60 text-xs max-md:text-end">
                  <motion.p
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.75, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="m-0"
                  >
                    © {t('db.metadata.company.name')} {new Date().getFullYear()}
                  </motion.p>

                  <motion.p
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.75, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-xs m-0 md:mt-0"
                  >
                    {t('footer.copyright')}
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
                        viewport={{ once: true }}
                      >
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="md:text-main hover:text-text transition-colors duration-300"
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

        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full flex flex-row-reverse max-md:flex-col justify-center items-center gap-8 mt-12 mb-4"
        >
          <div className="flex justify-end items-center gap-8 text-xs">
            {[
              { id: 'privacyPolicy', label: t('footer.privacyPolicy') },
              { id: 'termsOfUse', label: t('footer.termsOfUse') },
              { id: 'cookiePolicy', label: t('footer.cookiePolicy') },
            ].map((link) => (
              <Link
                key={link.id}
                href={`/${link.label.replace(/\s+/g, '-').toLowerCase()}`}
                className="md:text-main hover:text-text transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="md:opacity-75 text-xs text-center">
            {recaptchaParts.map((part, i) => {
              if (part === 'PRIVACY_PLACEHOLDER') {
                return (
                  <Link
                    key={i}
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text underline transition-colors duration-200"
                  >
                    {t('footer.privacy')}
                  </Link>
                )
              }
              if (part === 'TERMS_PLACEHOLDER') {
                return (
                  <Link
                    key={i}
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text underline transition-colors duration-200"
                  >
                    {t('footer.terms')}
                  </Link>
                )
              }
              return part
            })}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
