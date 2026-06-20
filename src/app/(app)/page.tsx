'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Home, Paintbrush, Building2, Wrench, Plus } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

// Dummy Data for Services
const SERVICES = [
  { num: '01', title: 'Residential Architecture', desc: 'Designing homes that reflect lifestyle, context, and timeless architectural principles while creating spaces that feel personal and enduring.', icon: Home, img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg' },
  { num: '02', title: 'Interior Architecture', desc: 'Crafting interiors that seamlessly blend functionality, materials, lighting, and aesthetics to create meaningful experiences.', icon: Paintbrush, img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg' },
  { num: '03', title: 'Commercial Projects', desc: 'Creating thoughtful commercial environments that balance efficiency, brand identity, and user experience.', icon: Building2, img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781899764/IMG-20251016-WA0004_hvessu.jpg' },
  { num: '04', title: 'Renovations & Additions', desc: 'Transforming existing spaces with carefully considered interventions that respect the original structure while introducing contemporary functionality.', icon: Wrench, img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg' },
  { num: '05', title: 'Coming Soon', desc: 'Reserved for future services and expansion of Aakarshala\u0027s offerings.', icon: Plus, img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg' },
]

// Dummy Data for Projects (5 cards hierarchical masonry)
const PROJECTS = [
  {
    slug: 'the-courtyard-residence',
    category: 'Architecture',
    title: 'The Courtyard Residence',
    location: 'Chennai, India',
    img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg',
    sizeClass: 'lg:col-span-2 lg:row-span-2 md:col-span-2',
    heightClass: 'h-[350px] md:h-[500px] lg:h-full lg:min-h-[800px]',
  },
  {
    slug: 'serene-apartment',
    category: 'Interior',
    title: 'Serene Apartment',
    location: 'Bangalore, India',
    img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg',
    sizeClass: 'lg:col-span-1 lg:row-span-1',
    heightClass: 'h-[300px] md:h-[350px] lg:h-full lg:min-h-[388px]',
  },
  {
    slug: 'urban-workspace',
    category: 'Commercial',
    title: 'Urban Workspace',
    location: 'Mumbai, India',
    img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781899764/IMG-20251016-WA0004_hvessu.jpg',
    sizeClass: 'lg:col-span-1 lg:row-span-1',
    heightClass: 'h-[300px] md:h-[350px] lg:h-full lg:min-h-[388px]',
  },
  {
    slug: 'palm-retreat',
    category: 'Architecture',
    title: 'Palm Retreat',
    location: 'Goa, India',
    img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg',
    sizeClass: 'lg:col-span-1 lg:row-span-1',
    heightClass: 'h-[300px] md:h-[350px] lg:h-[400px]',
  },
  {
    slug: 'minimal-haven',
    category: 'Interior',
    title: 'Minimal Haven',
    location: 'Delhi, India',
    img: 'https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg',
    sizeClass: 'lg:col-span-2 lg:row-span-1 md:col-span-2',
    heightClass: 'h-[300px] md:h-[350px] lg:h-[400px]',
  },
]

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="relative min-h-screen">

      {/* ─── Hero Section ─── */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg"
            alt="Aakarshala Architecture Hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-4 md:mb-6"
          >
            Timeless Design
            <br />
            <span className="text-white/80">Refined Spaces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl font-medium max-w-2xl mx-auto mb-8 md:mb-10 text-white/90 px-2"
          >
            We craft architectural marvels and interior spaces that tell a story of elegance, innovation, and unparalleled craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="bg-white text-black px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium hover:bg-neutral-200 transition-colors duration-300 flex items-center group w-full sm:w-auto justify-center"
            >
              Explore Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/consultation"
              className="border border-white text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Philosophy Section ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
            >
              <h2 className="font-heading text-sm uppercase tracking-widest text-accent font-semibold mb-4">Our Philosophy</h2>
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 md:mb-6">Designing the Unseen.</h3>
              <p className="text-foreground/80 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
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
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={2}
              viewport={{ once: false, margin: "-80px" }}
              className="relative h-[350px] md:h-[500px] lg:h-[600px] bg-neutral-200 rounded-xl md:rounded-2xl overflow-hidden"
            >
               <Image
                 src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg"
                 alt="Aakarshala Architecture Philosophy"
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="py-20 md:py-32 bg-[#FAF8F4] text-[#111111] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mb-10 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
            {SERVICES.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div 
                  key={service.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={i}
                  viewport={{ once: false, margin: "-50px" }}
                  className="bg-[#FFFFFF] p-7 md:p-10 rounded-[20px] md:rounded-[24px] border border-black/5 relative group overflow-hidden flex flex-col justify-between hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 min-h-[280px] md:min-h-[360px]"
                >
                  {/* Hover Background Image Reveal */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <Image 
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                  </div>

                  {/* Number */}
                  <div className="absolute top-2 right-4 md:top-4 md:right-6 text-[80px] md:text-[120px] leading-none font-heading font-bold text-black/[0.03] group-hover:text-white/[0.08] select-none pointer-events-none group-hover:scale-110 transition-all duration-700 z-10">
                    {service.num}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 border border-black/10 group-hover:border-white/30 rounded-xl flex items-center justify-center mb-6 md:mb-8 bg-white group-hover:bg-transparent text-[#111111] group-hover:text-white transition-all duration-500 relative z-10">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 text-[#111111] group-hover:text-white transition-colors duration-500 mt-auto">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-heading leading-tight">{service.title}</h3>
                    <p className="text-sm md:text-base text-[#666666] group-hover:text-white/80 leading-relaxed transition-colors duration-500">{service.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Selected Projects Section ─── */}
      <section className="py-20 md:py-32 bg-[#FAF8F4] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mb-10 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-[#111111]">Selected Projects</h2>
            <p className="text-base md:text-xl text-[#666666] max-w-2xl font-light italic">
              &quot;Spaces shaped with intention, crafted with precision, and designed to stand the test of time.&quot;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" style={{ gridAutoFlow: 'dense' }}>
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: false, margin: "-50px" }}
                className={`w-full relative ${project.sizeClass}`}
              >
                <Link href={`/projects/${project.slug}`} className={`group block w-full relative rounded-[20px] md:rounded-[28px] overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700 ${project.heightClass}`}>
                  <Image 
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out z-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                    <span className="bg-black/20 backdrop-blur-md text-white text-[10px] md:text-xs font-semibold uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Content Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-20 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold font-heading mb-1 md:mb-2 truncate">{project.title}</h3>
                      <p className="text-white/80 text-sm md:text-base font-medium tracking-wide">{project.location}</p>
                    </div>
                    <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                      <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call To Action Section ─── */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#2A3324] text-[#FDFBF7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="space-y-6 md:space-y-10"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
              Let&apos;s Create <br/>Something <span className="italic font-light text-[#D4AF37]">Timeless</span>
            </h2>
            <p className="text-base md:text-xl lg:text-2xl text-[#FDFBF7]/70 max-w-2xl mx-auto font-light leading-relaxed px-2">
              &quot;Whether you&apos;re envisioning a new home, transforming an existing space, or exploring possibilities, we&apos;d welcome the opportunity to discuss your vision.&quot;
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 md:pt-8">
              <Link 
                href="/contact" 
                className="bg-[#FDFBF7] text-[#2A3324] px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-xl flex items-center justify-center"
              >
                Book Consultation
              </Link>
              <Link 
                href="/projects" 
                className="border border-[#FDFBF7]/30 text-[#FDFBF7] px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:bg-[#FDFBF7]/10 transition-colors duration-300 w-full sm:w-auto text-center"
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
