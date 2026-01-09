'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { getWhoweare, getMetadata } from '@/lib/getDatabase'
import Heading from '@/components/ui/Heading'

export default function WhoWeAre() {
  const whoweareData = getWhoweare()
  const metadata = getMetadata()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  return (
    <section ref={containerRef} className="relative w-full h-full overflow-hidden bg-black text-text px-18 max-md:px-4 py-8">
      <motion.div style={{ opacity, scale }} className="relative space-y-18">
        <Heading text="Who We Are" tagline={whoweareData.tagline} />

        {/* Content grid */}
        <div className="gap-12 max-md:gap-16 grid lg:grid-cols-12 mb-32">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0.5, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative lg:col-span-7"
          >
            <div className="relative mb-12">
              <motion.div
                initial={{ filter: 'blur(10px' }}
                whileInView={{ filter: 'blur(0px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                data-scroll
                data-scroll-speed="0.1"
                className="relative h-[50vh]"
              >
                <Image
                  src="/images/projects/east-lane/el-main-3.avif"
                  alt="EastLane Project"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-center object-cover hover:scale-105 transition-transform duration-700"
                />

                <div className="z-20 absolute inset-0 border border-main/35 rounded-sm -rotate-6 scale-90 pointer-events-none" />
                <div className="z-20 absolute inset-3 border border-main/35 rounded-sm -rotate-6 scale-90 pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
                className="-right-18 max-md:right-0 -bottom-2 z-30 absolute backdrop-blur-2xl border border-main/50 rounded-sm rotate-6 px-8 py-4"
              >
                <p className="text-main text-xs tracking-[0.3vw]">{metadata.company.tagline}</p>
              </motion.div>
            </div>

            <p className="text-[1vw] max-md:text-[4vw] max-lg:text-[2vw] normal-case text-balance">{whoweareData.description}</p>

            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-px bg-main" />
              <a href="tel:+15061" className="text-main hover:text-text text-xs hover:text-sm italic transition-all duration-700">
                hotline: {metadata.company.hotline}
              </a>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0.5, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-12 lg:col-span-5"
          >
            <div className="relative overflow-hidden bg-black border border-main/20 rounded-sm p-8">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: ['120%', '-120%'] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-main/20 to-transparent -rotate-130 scale-150"
              />

              <div className="top-0 left-0 absolute w-20 h-20 border-main/35 border-t border-l rounded-tl-sm" />
              <div className="right-0 bottom-0 absolute w-20 h-20 border-main/35 border-r border-b rounded-br-sm" />

              <div className="relative space-y-8">
                {[
                  { number: whoweareData.statistics.yearsOfExperience, label: 'Years of Experience' },
                  { number: whoweareData.statistics.projectsCompleted, label: 'Projects Completed' },
                  { number: whoweareData.statistics.towersDelivered, label: 'Towers Delivered' },
                  { number: whoweareData.statistics.landmarkProjects, label: 'Landmark Projects' },
                  { number: whoweareData.statistics.workforce, label: 'Workforce' },
                ].map((stat, index) => (
                  <div key={index} className="border-main/30 border-l text-text hover:translate-x-2.5 duration-300 pl-6 cursor-default">
                    <span className="font-light max-md:font-medium text-[2vw] max-lg:text-[5vw]">{stat.number}</span>
                    <h6 className="font-extralight max-sm:font-medium text-[1vw] max-md:text-[3vw] max-lg:text-[1.7vw] tracking-wide">
                      {stat.label}
                    </h6>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ filter: 'blur(10px' }}
                whileInView={{ filter: 'blur(0px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative rounded-2xl p-4"
              >
                <div data-scroll data-scroll-speed="0.05" className="z-30 relative h-[38vh] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/projects/yellow-residence/yr-gallery-3.webp"
                    alt="EastLane Project"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-center object-cover scale-110 hover:scale-115 transition-transform duration-700"
                  />
                </div>

                <div className="z-20 absolute inset-0 border border-main/35 rounded-sm -rotate-12 scale-90 translate-y-2 pointer-events-none" />
                <div className="z-20 absolute inset-3 border border-main/35 rounded-sm -rotate-12 scale-90 translate-y-2 pointer-events-none" />

                <div className="top-0 left-0 z-30 absolute w-12 h-12 border-main/35 border-t-2 border-l-2 rounded-sm" />
                <div className="right-0 bottom-0 z-30 absolute w-12 h-12 border-main/35 border-r-2 border-b-2 rounded-sm" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Full-width cinematic image section */}
        <motion.div
          className="hidden relative -mx-6 md:-mx-12 lg:-mx-20 mb-32"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative h-[60vh] overflow-hidden">
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}>
              <Image
                src="/images/projects/east-lane/el-main-3.avif"
                alt="Signature luxury estate"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
              {/* Dramatic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Overlay text */}
            <div className="absolute inset-0 flex justify-center items-center">
              <motion.div
                className="text-center px-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p
                  className="font-light text-[#FAFAFA] text-4xl md:text-5xl lg:text-6xl mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Curating Excellence
                </p>
                <div className="w-32 h-[1px] bg-[#D4AF37] mx-auto" />
              </motion.div>
            </div>

            {/* Decorative borders */}
            <div className="absolute inset-0 border-[#D4AF37]/10 border-4 pointer-events-none" />
            <div className="absolute inset-8 border border-[#D4AF37]/20 pointer-events-none" />
          </div>
        </motion.div>

        {/* Philosophy section with image gallery */}
        <motion.div
          className="hidden border-[#D4AF37]/20 border-t mb-32 pt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.h3
            className="font-light text-[#FAFAFA] text-3xl md:text-4xl text-center tracking-wide mb-16"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Our Philosophy
          </motion.h3>

          <div className="gap-12 grid md:grid-cols-3 mb-20">
            {whoweareData.values
              ?.slice(0, 3)
              .map((value, index) => ({
                title: value.title,
                description: value.description,
                image: '/images/projects/east-lane/el-main-3.avif',
              }))
              .map((principle, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                >
                  {/* Image with hover effect */}
                  <div className="relative h-72 overflow-hidden mb-8">
                    <div className="z-10 absolute inset-0 bg-[#0A0A0A] opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                    <Image
                      src={principle.image}
                      alt={principle.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    {/* Number overlay */}
                    <div
                      className="top-6 right-6 z-20 absolute opacity-20 font-light text-[#D4AF37] text-8xl"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {/* Border frame */}
                    <div className="z-20 absolute inset-0 border border-[#D4AF37]/30 pointer-events-none" />
                  </div>

                  <div className="overflow-hidden mb-6">
                    <motion.div
                      className="w-12 h-[1px] bg-[#D4AF37]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                    />
                  </div>

                  <h4
                    className="font-light text-[#FAFAFA] text-2xl tracking-wide mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {principle.title}
                  </h4>

                  <p className="font-light text-[#A0A0A0] text-sm leading-relaxed">{principle.description}</p>

                  {/* Hover accent line */}
                  <motion.div
                    className="bottom-0 left-0 absolute w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              ))}
          </div>

          {/* Testimonial/Award section */}
          <motion.div
            className="items-center gap-12 grid md:grid-cols-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Award/Recognition image */}
            <div className="relative h-96 overflow-hidden order-2 md:order-1">
              <div className="z-10 absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#0A0A0A]/50 mix-blend-overlay" />
              <Image
                src="/images/projects/east-lane/el-main-3.avif"
                alt="Award winning property"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              {/* Decorative geometric overlay */}
              <svg className="top-8 left-8 z-20 absolute w-24 h-24 opacity-40" viewBox="0 0 100 100">
                <polygon points="50,10 90,90 10,90" fill="none" stroke="#D4AF37" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="1" />
              </svg>
            </div>

            {/* Recognition text */}
            <div className="order-1 md:order-2">
              <motion.div
                className="inline-block border border-[#D4AF37]/30 mb-6 px-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em]">Recognition</p>
              </motion.div>

              <h4
                className="font-light text-[#E8E8E8] text-3xl md:text-4xl leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Awarded Best Luxury Real Estate Firm for 12 Consecutive Years
              </h4>

              <p className="font-light text-[#A0A0A0] leading-relaxed mb-8">
                Our commitment to excellence has been recognized by the International Luxury Real Estate Association, Forbes Global
                Properties, and the Estate Agents Excellence Awards. Yet our greatest accolade remains the trust of clients who return to us
                generation after generation.
              </p>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="font-light text-[#D4AF37] text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    150+
                  </div>
                  <div className="text-[#A0A0A0] text-xs uppercase tracking-wider">Awards</div>
                </div>
                <div className="w-[1px] h-12 bg-[#D4AF37]/30" />
                <div className="text-center">
                  <div className="font-light text-[#D4AF37] text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    45
                  </div>
                  <div className="text-[#A0A0A0] text-xs uppercase tracking-wider">Countries</div>
                </div>
                <div className="w-[1px] h-12 bg-[#D4AF37]/30" />
                <div className="text-center">
                  <div className="font-light text-[#D4AF37] text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    98%
                  </div>
                  <div className="text-[#A0A0A0] text-xs uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing statement */}
        <motion.div
          className="hidden relative text-center mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {/* Signature imagery - dual portraits */}
          <div className="gap-8 grid md:grid-cols-2 mb-16">
            <motion.div
              className="group relative h-96 overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.7 }}
            >
              <div className="z-10 absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <Image
                src="/images/projects/east-lane/el-main-3.avif"
                alt="Our heritage"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover sepia group-hover:sepia-0 transition-all duration-700"
              />
              <div className="z-20 absolute inset-0 border border-[#D4AF37]/20 pointer-events-none" />
              {/* Corner accents */}
              <div className="top-0 left-0 z-30 absolute w-16 h-16 border-[#D4AF37] border-t-2 border-l-2" />
              <div className="right-0 bottom-0 z-30 absolute w-16 h-16 border-[#D4AF37] border-r-2 border-b-2" />
            </motion.div>

            <motion.div
              className="group relative h-96 overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.9 }}
            >
              <div className="z-10 absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <Image
                src="/images/projects/east-lane/el-main-3.avif"
                alt="Our vision"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover sepia group-hover:sepia-0 transition-all duration-700"
              />
              <div className="z-20 absolute inset-0 border border-[#D4AF37]/20 pointer-events-none" />
              {/* Corner accents */}
              <div className="top-0 left-0 z-30 absolute w-16 h-16 border-[#D4AF37] border-t-2 border-l-2" />
              <div className="right-0 bottom-0 z-30 absolute w-16 h-16 border-[#D4AF37] border-r-2 border-b-2" />
            </motion.div>
          </div>

          <p
            className="max-w-3xl font-light text-[#C0C0C0] text-xl md:text-2xl italic mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "We do not sell properties. We orchestrate the union of discerning individuals with spaces that elevate existence."
          </p>

          <motion.div
            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.8 }}
          />

          {/* Signature mark */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="inline-flex items-center gap-4 bg-[#0A0A0A]/50 backdrop-blur-sm border border-[#D4AF37]/20 px-8 py-4">
              <div className="w-12 h-12 flex justify-center items-center border border-[#D4AF37]">
                <div className="w-6 h-6 border border-[#D4AF37] rotate-45" />
              </div>
              <div className="text-left">
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-1">Your Legacy Awaits</p>
                <p className="font-light text-[#A0A0A0] text-xs">By Invitation Only</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom corner decoration */}
      <motion.div
        className="hidden bottom-12 left-12 absolute w-24 h-24"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="absolute inset-0 border-[#D4AF37] border-b border-l" />
      </motion.div>
    </section>
  )
}
