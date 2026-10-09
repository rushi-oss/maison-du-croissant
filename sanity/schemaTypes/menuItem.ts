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
          { title: 'Croastie', value: 'croastie' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (Rs)',
      type: 'number',
      description: 'Never shown on the site. Used to price pre-orders and personal bulk orders.',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'b2bPrice',
      title: 'B2B Price (Rs)',
      type: 'number',
      description:
        'Your price for business bulk orders. Only appears in the order email, never on the site. Leave empty to use the menu price.',
      hidden: ({ document }) => document?.category === 'puff',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Shown in the "new" slideshow on the homepage when the item is marked New.',
      options: { hotspot: true },
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
      hidden: ({ document }) => document?.category === 'puff' || document?.category === 'croastie',
      validation: (r) =>
        r.custom((value, context) => {
          if (context.document?.category === 'puff' || context.document?.category === 'croastie') return true
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
      name: 'isNew',
      title: 'New',
      type: 'boolean',
      description: 'Shows a red "New" badge next to the item on the menu.',
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
