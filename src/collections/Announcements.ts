import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: 'Announcement',
    plural: 'Announcements',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'status'],
  },
  access: {
    read: () => true, // Public can read announcements
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Announcement Title',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Announcement Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Optional image to display with the announcement',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Publish Date',
      defaultValue: () => new Date(),
      admin: {
        description: 'When this announcement should be displayed',
      },
    },
    {
      name: 'priority',
      type: 'select',
      label: 'Priority Level',
      defaultValue: 'normal',
      options: [
        { label: 'High (Emergency)', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
    },
  ],
}