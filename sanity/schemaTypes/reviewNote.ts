import { defineField, defineType } from 'sanity'

export const reviewNote = defineType({
  name: 'reviewNote',
  title: 'Review Note',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Note Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { media: 'image', order: 'order' },
    prepare({ media, order }) {
      return {
        title: `Note #${order ?? '?'}`,
        media,
      }
    },
  },
})
