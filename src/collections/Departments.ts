// src/collections/Departments.ts
import type { CollectionConfig } from 'payload'

export const Departments: CollectionConfig = {
  slug: 'departments',
  labels: {
    singular: 'Department',
    plural: 'Departments',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'status'],
  },
  access: {
    read: () => true, // Public can read departments
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Department Name',
      admin: {
        description: 'e.g., Parks & Recreation, Public Works',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly version (e.g., parks-recreation)',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'overview',
      type: 'richText',
      label: 'Department Overview',
      admin: {
        description: 'Description that appears at the top of the department page. You can use line breaks and basic formatting.',
      },
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Department Contacts',
      labels: {
        singular: 'Contact',
        plural: 'Contacts',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title/Position',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          admin: {
            description: 'Format: (555) 123-4567',
          },
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo (optional)',
        },
      ],
      admin: {
        description: 'Add department staff in the order you want them displayed',
      },
    },
    {
      name: 'officeInfo',
      type: 'group',
      label: 'Office Information',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Physical Address',
          admin: {
            description: 'If different from City Hall. Use line breaks for formatting.',
            rows: 3,
          },
        },
        {
          name: 'hours',
          type: 'textarea',
          label: 'Office Hours',
          defaultValue: 'Monday - Friday\n8:00 AM - 5:00 PM',
          admin: {
            rows: 4,
          },
        },
        {
          name: 'mainPhone',
          type: 'text',
          label: 'Main Office Phone (optional)',
        },
        {
          name: 'fax',
          type: 'text',
          label: 'Fax Number (optional)',
        },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      labels: {
        singular: 'Quick Link',
        plural: 'Quick Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description (Optional)',
          admin: {
            description: 'Short description of what this link provides',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
      ],
      admin: {
        description: 'Common forms, applications, or resources',
      },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Department Services',
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Name',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description',
          admin: {
            rows: 4,
          },
        },
        {
          name: 'requirements',
          type: 'textarea',
          label: 'Requirements (Optional)',
          admin: {
            description: 'What users need to know or bring for this service',
            rows: 3,
          },
        },
        {
          name: 'fees',
          type: 'text',
          label: 'Fees (Optional)',
          admin: {
            description: 'Cost information for this service',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Learn More Link (Optional)',
          admin: {
            description: 'Optional link to more information',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Additional Content',
      admin: {
        description: 'Main content area for department-specific information',
        rows: 10,
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Hero image for the department page',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
    },
  ],
}