import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds (ISR) instead of force-dynamic

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

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  coverImage?: { url: string; alt?: string } | string;
}

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })
  let dbProjects: Project[] = []
  try {
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 100,
    })
    dbProjects = result.docs as unknown as Project[]
  } catch (err) {
    console.warn('Database not initialized yet, skipping project fetch during build.', err)
  }
  // Standard responsive height for admin cards
  const standardHeight = 'h-[300px] md:h-[350px] lg:h-[400px]'

  return (
    <div className="min-h-screen bg-[#FAF8F4] overflow-hidden pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        
        {/* ─── Static Homepage Grid (Banners) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24" style={{ gridAutoFlow: 'dense' }}>
          {PROJECTS.map((project) => (
            <div
              key={project.slug}
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
            </div>
          ))}
        </div>

        {/* ─── Projects Heading ─── */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Projects</h1>
          
        {/* ─── Dynamically Added Admin Projects ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {(!dbProjects || dbProjects.length === 0) && (
            <div className={`w-full relative ${standardHeight}`}>
              <div className="w-full h-full rounded-[20px] md:rounded-[28px] overflow-hidden bg-neutral-200/50 border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-center p-8 transition-colors duration-500 hover:bg-neutral-200">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                  <ArrowUpRight className="w-6 h-6 text-neutral-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-800 mb-4">Admin Projects Area</h3>
                <p className="text-neutral-500 text-xs md:text-sm max-w-[250px] font-medium">
                  When you upload new projects via the CMS, they will appear here.
                </p>
              </div>
            </div>
          )}

          {dbProjects.map((project) => {
            const coverUrl = typeof project.coverImage === 'string' ? project.coverImage : '';
            const coverAlt = project.title;

            return (
              <div
                key={project.id}
                className={`w-full relative`}
              >
                <Link href={`/projects/${project.slug}`} className={`group block w-full relative rounded-[20px] md:rounded-[28px] overflow-hidden hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700 ${standardHeight}`}>
                  {coverUrl ? (
                    <Image 
                      src={coverUrl}
                      alt={coverAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out z-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-300" />
                  )}
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                    <span className="bg-black/20 backdrop-blur-md text-white text-[10px] md:text-xs font-semibold uppercase tracking-widest px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 shadow-sm">
                      {project.category || 'Architecture'}
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
