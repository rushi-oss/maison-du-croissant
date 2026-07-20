import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Savory Croissant', value: 'savory' },
          { title: 'Sweet Croissant', value: 'sweet' },
          { title: 'Puff', value: 'puff' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (Rs)',
      type: 'number',
      description: 'Optional — only needed for pre-order. Not shown on the public menu.',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'dietary',
      title: 'Available As',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🌱 Veg Croissant', value: 'veg' },
          { title: '🥚 Egg-Washed Croissant', value: 'egg' },
        ],
        layout: 'grid',
      },
      hidden: ({ document }) => document?.category === 'puff',
      validation: (r) =>
        r.custom((value, context) => {
          if (context.document?.category === 'puff') return true
          return value && value.length > 0 ? true : 'Required'
        }),
    }),
    defineField({
      name: 'bestSeller',
      title: 'Best Seller',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within their category',
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
    select: { title: 'name', subtitle: 'category', available: 'available' },
    prepare({ title, subtitle, available }) {
      return {
        title: available ? title : `[UNAVAILABLE] ${title}`,
        subtitle,
      }
    },
  },
})
