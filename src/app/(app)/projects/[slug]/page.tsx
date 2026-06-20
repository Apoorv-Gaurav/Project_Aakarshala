import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds (ISR) instead of force-dynamic

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  coverImage?: { url: string; alt?: string } | string;
}

const getMasonryClasses = (index: number) => {
  const mod = index % 5;
  if (mod === 0) return { sizeClass: 'lg:col-span-2 lg:row-span-2 md:col-span-2', heightClass: 'h-[350px] md:h-[500px] lg:h-[800px]' };
  if (mod === 1) return { sizeClass: 'lg:col-span-1 lg:row-span-1', heightClass: 'h-[300px] md:h-[350px] lg:h-[388px]' };
  if (mod === 2) return { sizeClass: 'lg:col-span-1 lg:row-span-1', heightClass: 'h-[300px] md:h-[350px] lg:h-[388px]' };
  if (mod === 3) return { sizeClass: 'lg:col-span-1 lg:row-span-1', heightClass: 'h-[300px] md:h-[350px] lg:h-[400px]' };
  return { sizeClass: 'lg:col-span-2 lg:row-span-1 md:col-span-2', heightClass: 'h-[300px] md:h-[350px] lg:h-[400px]' };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const payload = await getPayload({ config: configPromise })
  
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
    },
    limit: 1,
  })

  if (!projects || projects.length === 0) {
    notFound()
  }

  const project = projects[0]

  const { docs: otherProjects } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        not_equals: resolvedParams.slug,
      },
    },
    limit: 5,
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-[70vh] relative bg-neutral-200">
        {project.coverImage && typeof project.coverImage !== 'string' && (
          <Image 
            src={project.coverImage.url as string} 
            alt={project.coverImage.alt as string || project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-8 pb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">{project.category}</span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 prose prose-lg prose-neutral dark:prose-invert">
            {project.description && (
              <div>
                <p>Detailed description coming soon...</p>
              </div>
            )}
            {!project.description && <p>No description provided.</p>}
          </div>
          
          <div className="space-y-8 border-t md:border-t-0 md:border-l border-border/50 pt-8 md:pt-0 md:pl-8">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-1">Location</h3>
              <p className="text-lg font-medium">{project.location}</p>
            </div>
            {project.clientName && (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-1">Client</h3>
                <p className="text-lg font-medium">{project.clientName}</p>
              </div>
            )}
            {project.completionYear && (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-1">Year</h3>
                <p className="text-lg font-medium">{project.completionYear}</p>
              </div>
            )}
            {project.area && (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-1">Area</h3>
                <p className="text-lg font-medium">{project.area}</p>
              </div>
            )}
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-bold mb-8">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((item: { image: { url: string; alt?: string } | string }, index: number) => {
                if (typeof item.image === 'string') return null;
                return (
                  <div key={index} className="aspect-[4/3] relative bg-neutral-200 rounded-xl overflow-hidden">
                    <Image 
                      src={item.image.url} 
                      alt={item.image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
