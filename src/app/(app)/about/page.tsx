'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Dummy images based on the user's available cloudinary resources
const IMG_BANNER_1 = "https://res.cloudinary.com/dpr8jejse/image/upload/v1781899765/IMG-20251128-WA0002_gaqffc.jpg"
const IMG_BANNER_2 = "https://res.cloudinary.com/dpr8jejse/image/upload/v1781899762/IMG-20250703-WA0003_ntsobd.jpg"
const IMG_LOCATION = "https://res.cloudinary.com/dpr8jejse/image/upload/v1781900216/location_1_vl0qcf.jpg"

export default function AboutPage() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 md:px-8 border-b border-border/50 bg-[#FDFBF7] dark:bg-neutral-950 overflow-hidden">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            Every Project Is <br className="hidden md:block" />
            <span className="text-accent italic font-light">A Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto font-light tracking-wide"
          >
            &quot;I listen carefully, design intentionally, and build with care.&quot;
          </motion.p>
        </div>
      </section>

      {/* 2. Design Philosophy */}
      <section className="py-32 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-10">Design Philosophy</h2>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p>
                  Architecture, at its best, is a dialogue between light, material, and human experience. At Aakarshala, every project begins with understanding its context and the people it serves. Spaces should emerge naturally from their surroundings and respond to climate, lifestyle, and everyday rhythms.
                </p>
                <p>
                  The design process begins with listening—to the site, to aspirations, and to functional requirements. Simplicity, honesty, and timelessness guide every decision.
                </p>
                <p>
                  Natural materials, changing light, and thoughtful details shape environments that age gracefully and create meaningful experiences.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="order-1 lg:order-2 relative h-[500px] md:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl group"
            >
              <Image
                src={IMG_BANNER_1}
                alt="Design Philosophy"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Beginning Section */}
      <section className="py-32 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900 border-y border-border/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-xl group"
            >
              <Image
                src={IMG_BANNER_2}
                alt="The Beginning"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-10">The Beginning</h2>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p>
                  Aakarshala was founded with a belief that architecture is more than creating structures—it is about creating experiences. Every project tells a story through materials, proportions, light, and human interaction.
                </p>
                <p>
                  What began as a passion for thoughtful design evolved into a studio dedicated to creating spaces that reflect individuality and stand the test of time. Each commission is approached with curiosity, precision, and an unwavering commitment to quality.
                </p>
                <p className="text-xl font-medium text-foreground italic mt-8 border-l-2 border-accent pl-6">
                  &quot;Architecture should not impose itself; it should reveal what a place wants to become.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. My Approach Section */}
      <section className="py-32 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">Our Approach</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { num: '01', title: 'Listen', desc: 'Understanding the client\'s vision, needs, aspirations, and the unique qualities of every site through meaningful conversations and careful analysis.' },
              { num: '02', title: 'Design', desc: 'Developing concepts that balance aesthetics and functionality while exploring materials, forms, and spatial relationships.' },
              { num: '03', title: 'Refine', desc: 'Collaborating closely through feedback, technical coordination, and detailing to ensure every element contributes to the whole.' },
              { num: '04', title: 'Build', desc: 'Overseeing execution with care, ensuring the built reality honors the design intent and exceeds expectations.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="text-6xl font-heading font-light text-accent/20 mb-6 group-hover:text-accent/40 transition-colors duration-500">{step.num}</div>
                <h3 className="text-2xl font-bold mb-4 font-heading">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed font-light">{step.desc}</p>
                <div className="absolute top-8 left-16 right-0 h-[1px] bg-border/50 hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Values Section */}
      <section className="py-32 px-4 md:px-8 bg-neutral-100 dark:bg-neutral-900 border-y border-border/50 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 max-w-3xl"
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">Spaces Crafted <br />With Meaning</h2>
            <p className="text-xl md:text-2xl text-foreground/60 font-light italic">
              &quot;Architecture should inspire, endure, and enrich everyday life.&quot;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Timeless Design',
              'Attention to Detail',
              'Contextual Thinking',
              'Human-Centered Spaces',
              'Craftsmanship',
              'Sustainability'
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-10 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="text-xl font-semibold group-hover:text-accent transition-colors relative z-10">{value}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Studio Philosophy Quote */}
      <section className="py-40 px-4 md:px-8 bg-[#FDFBF7] dark:bg-neutral-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-accent text-8xl md:text-9xl font-heading leading-none h-16 opacity-50 mb-4">"</div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-light leading-snug">
              Great architecture is not simply seen—it is <span className="font-bold italic text-accent">experienced</span>.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 7. The People Behind Aakarshala */}
      <section className="py-32 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">The People Behind Aakarshala</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light italic">
              &quot;Meet the minds and creators shaping every project with passion and precision.&quot;
            </p>
          </motion.div>

          <div className="space-y-24">
            {[
              { name: 'Amit Verma', role: 'Founder & Principal Architect', desc: 'Amit Verma leads Aakarshala with a vision rooted in timeless design, thoughtful craftsmanship, and client-centric architecture. His approach combines creativity with technical excellence to create spaces that are elegant, practical, and enduring.', img: "https://res.cloudinary.com/dpr8jejse/image/upload/v1781905617/profile_1_npxnt3.jpg" },
              { name: 'Senior Interior Designer', role: 'Interior Design Lead', desc: 'Responsible for translating ideas into immersive interiors with attention to materials, lighting, and functionality.', img: IMG_BANNER_1 },
            ].map((person, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="md:col-span-5 relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-md group cursor-pointer"
                >
                  <Image
                    src={person.img}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="md:col-span-7 px-4 md:px-0"
                >
                  <h3 className="text-4xl lg:text-5xl font-heading font-bold mb-4">{person.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-6">{person.role}</p>
                  <p className="text-xl text-foreground/70 leading-relaxed font-light">{person.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Experience Section */}
      <section className="py-32 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900 border-t border-border/50 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group"
            >
              <Image
                src={"https://res.cloudinary.com/dpr8jejse/image/upload/v1781906286/__2_xskksr.jpg"}
                alt="Experience"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-10">Experience</h2>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p>
                  Years of practice and collaboration have shaped a design approach centered around quality, clarity, and trust. Every project—whether residential, commercial, or hospitality—is treated as a unique opportunity to create meaningful environments.
                </p>
                <p>
                  The studio believes in close collaboration, transparent communication, and delivering spaces that continue to inspire long after completion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Call To Action Section */}
      <section className="py-32 px-4 md:px-8 bg-[#2A3324] text-[#FDFBF7] relative overflow-hidden">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
              Let&apos;s Create <br />Something <span className="italic font-light text-[#D4AF37]">Timeless</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#FDFBF7]/70 max-w-2xl mx-auto font-light leading-relaxed">
              &quot;Whether you&apos;re envisioning a new home, transforming an existing space, or exploring possibilities, we&apos;d welcome the opportunity to discuss your vision.&quot;
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link
                href="/contact"
                className="bg-[#FDFBF7] text-[#2A3324] px-10 py-5 rounded-full text-lg font-medium hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-xl flex items-center justify-center"
              >
                Book Consultation
              </Link>
              <Link
                href="/projects"
                className="border border-[#FDFBF7]/30 text-[#FDFBF7] px-10 py-5 rounded-full text-lg font-medium hover:bg-[#FDFBF7]/10 transition-colors duration-300 w-full sm:w-auto"
              >
                Explore Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
