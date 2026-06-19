'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg"
            alt="Aakarshala Architecture Hero"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6"
          >
            Timeless Design
            <br />
            <span className="text-white/80">Refined Spaces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 text-white/90"
          >
            We craft architectural marvels and interior spaces that tell a story of elegance, innovation, and unparalleled craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              href="/projects"
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-neutral-200 transition-colors duration-300 flex items-center group"
            >
              Explore Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/consultation"
              className="border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-300"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-heading text-sm uppercase tracking-widest text-accent font-semibold mb-4">Our Philosophy</h2>
              <h3 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">Designing the Unseen.</h3>
              <p className="text-foreground/80 text-lg mb-8 leading-relaxed">
                At Aakarshala, we believe that true luxury lies in the details. It is not just about what you see, but how a space makes you feel. We blend modern minimalism with warm, organic textures to create environments that are both striking and intimately comfortable.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-accent font-medium hover:text-foreground transition-colors group"
              >
                Read our story
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative h-[600px] bg-neutral-200 rounded-xl overflow-hidden"
            >
               <Image
                 src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg"
                 alt="Aakarshala Architecture Philosophy"
                 fill
                 className="object-cover"
               />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
