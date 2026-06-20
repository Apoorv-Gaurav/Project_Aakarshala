import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Architecture', value: 'architecture' },
        { label: 'Interior Design', value: 'interior' },
        { label: 'Landscape', value: 'landscape' },
      ],
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'clientName',
      type: 'text',
    },
    {
      name: 'completionYear',
      type: 'number',
    },
    {
      name: 'area',
      type: 'text',
      admin: {
        description: 'e.g. 5,000 sq ft',
      },
    },
    {
      name: 'coverImage',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: '@/components/CloudinaryUploader#CloudinaryUploader',
        },
      },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'text',
          required: true,
          admin: {
            components: {
              Field: '@/components/CloudinaryUploader#CloudinaryUploader',
            },
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
