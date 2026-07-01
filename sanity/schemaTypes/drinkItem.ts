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
      validation: (r) => r.required().positive(),
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
