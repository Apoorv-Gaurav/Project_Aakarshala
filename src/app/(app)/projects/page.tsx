import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 100,
  })

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group relative block overflow-hidden rounded-xl">
              <div className="aspect-[4/5] relative bg-neutral-200">
                {project.coverImage && typeof project.coverImage !== 'string' ? (
                  <Image 
                    src={project.coverImage.url} 
                    alt={project.coverImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-300" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-2 block">{project.category}</span>
                <h2 className="text-white text-2xl font-bold mb-1">{project.title}</h2>
                <p className="text-white/80 flex items-center">
                  {project.location}
                </p>
                <span className="mt-4 inline-flex items-center text-white font-medium hover:text-accent transition-colors">
                  View Project →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
