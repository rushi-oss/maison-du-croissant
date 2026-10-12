import { defineField, defineType } from 'sanity'

export const drinkItem = defineType({
  name: 'drinkItem',
  title: 'Drink',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
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
      name: 'comingSoon',
      title: 'Coming soon',
      type: 'boolean',
      description: 'Shows a "coming soon" tag next to the drink on the menu.',
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
      description: 'Lower numbers appear first',
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
    select: { title: 'name', price: 'price', available: 'available' },
    prepare({ title, price, available }) {
      return {
        title: available ? title : `[UNAVAILABLE] ${title}`,
        subtitle: price ? `Rs ${price}` : '',
      }
    },
  },
})
