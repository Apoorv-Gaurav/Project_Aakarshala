import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

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

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-[70vh] relative bg-neutral-200">
        {project.coverImage && typeof project.coverImage !== 'string' && (
          <Image 
            src={project.coverImage.url as string} 
            alt={project.coverImage.alt as string || project.title}
            fill
            className="object-cover"
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
              {project.gallery.map((item: any, index: number) => {
                if (typeof item.image === 'string') return null;
                return (
                  <div key={index} className="aspect-[4/3] relative bg-neutral-200 rounded-xl overflow-hidden">
                    <Image 
                      src={item.image.url} 
                      alt={item.image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
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
