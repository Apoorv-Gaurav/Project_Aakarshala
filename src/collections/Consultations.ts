import type { CollectionConfig } from 'payload'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'projectType', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'whatsappNumber',
      type: 'text',
    },
    {
      name: 'projectType',
      type: 'select',
      options: [
        { label: 'Architecture', value: 'architecture' },
        { label: 'Interior Design', value: 'interior' },
        { label: 'Landscape', value: 'landscape' },
        { label: 'Renovation', value: 'renovation' },
      ],
      required: true,
    },
    {
      name: 'projectLocation',
      type: 'text',
      required: true,
    },
    {
      name: 'budgetRange',
      type: 'text',
    },
    {
      name: 'preferredDate',
      type: 'date',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'package',
      type: 'select',
      options: [
        { label: 'Basic Consultation', value: 'basic' },
        { label: 'Premium Consultation', value: 'premium' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending Payment', value: 'pending_payment' },
        { label: 'Paid - Pending Action', value: 'paid_pending' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'pending_payment',
    },
    {
      name: 'paymentId',
      type: 'text',
    },
  ],
}
