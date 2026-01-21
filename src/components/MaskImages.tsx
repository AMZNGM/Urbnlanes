'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'

export default function MaskImages() {
  const { scrollYProgress } = useScroll()
  const clipPathValue1 = useTransform(scrollYProgress, [0, 0.1], [100, 0])
  const clipPathValue2 = useTransform(scrollYProgress, [0, 0.2], [150, 0])
  const clipPathValue3 = useTransform(scrollYProgress, [0, 0.3], [200, 0])
  const clipPathValue4 = useTransform(scrollYProgress, [0, 0.4], [250, 0])

  return (
    <section className="top-0 sticky w-dvw h-dvh overflow-hidden bg-black">
      <div className="w-full h-full flex flex-col justify-center items-end">
        <div className="relative w-1/3 h-full overflow-hidden flex justify-center items-center">
          {/* <Image
            src="/images/projects/east-lane/el-main-1.avif"
            alt="hero image 1"
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="relative object-cover"
          />

          <motion.div
            style={{
              clipPath: useTransform(clipPathValue1, (latest) => `inset(${latest}% 0 0 0)`),
            }}
            className="z-10 absolute inset-0"
          >
            <Image
              src="/images/projects/east-lane/el-main-2.avif"
              alt="hero image 1 clipPath"
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div> */}
        </div>

        <div className="relative w-1/3 h-full overflow-hidden flex justify-center items-center">
          <Image
            src="/images/projects/east-lane/el-main-2.avif"
            alt="hero image 2"
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

          <motion.div
            style={{
              clipPath: useTransform(clipPathValue2, (latest) => `inset(${latest}% 0 0 0)`),
            }}
            className="z-10 absolute inset-0"
          >
            <Image
              src="/images/projects/east-lane/el-main-3.avif"
              alt="hero image 2 clipPath"
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="relative w-1/3 h-full overflow-hidden flex justify-center items-center">
          <Image
            src="/images/projects/east-lane/el-main-3.avif"
            alt="hero image 3"
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

          <motion.div
            style={{
              clipPath: useTransform(clipPathValue3, (latest) => `inset(${latest}% 0 0 0)`),
            }}
            className="z-10 absolute inset-0"
          >
            <Image
              src="/images/projects/east-lane/el-main-4.avif"
              alt="hero image 3 clipPath"
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="md:hidden relative w-1/3 h-full overflow-hidden flex justify-center items-center">
          <Image
            src="/images/projects/east-lane/el-main-4.avif"
            alt="hero image 4"
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

          <motion.div
            style={{
              clipPath: useTransform(clipPathValue4, (latest) => `inset(${latest}% 0 0 0)`),
            }}
            className="z-10 absolute inset-0"
          >
            <Image
              src="/images/projects/east-lane/el-main-5.avif"
              alt="hero image 4 clipPath"
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
