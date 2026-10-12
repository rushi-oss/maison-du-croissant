import { defineArrayMember, defineField, defineType } from 'sanity'

// A seasonal special shown as a poster at the top of the homepage menu.
// Only one shows at a time: the newest one switched on.
export const promo = defineType({
  name: 'promo',
  title: 'Special offer',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Show on the website',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heroUntil',
      title: 'Show on the homepage until',
      type: 'datetime',
      description:
        'Until this date the poster is taped onto the homepage photo, in place of the board note. After it, the homepage goes back to the board note. The menu page keeps showing the poster while "Show on the website" is on.',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Small red label on top, e.g. "coming soon" or "this week". Leave empty for none.',
    }),
    defineField({
      name: 'kicker',
      title: 'Small heading',
      type: 'string',
      description: 'e.g. "Fasting season special"',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'offers',
      title: 'Prices',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'offer',
          fields: [
            defineField({ name: 'price', title: 'Price (Rs)', type: 'number', validation: (r) => r.required().positive() }),
            defineField({ name: 'label', title: 'What it is', type: 'string', validation: (r) => r.required() }),
          ],
          preview: {
            select: { price: 'price', label: 'label' },
            prepare: ({ price, label }) => ({ title: `Rs ${price}`, subtitle: label }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'kicker', active: 'active' },
    prepare: ({ title, subtitle, active }) => ({ title: active ? title : `[OFF] ${title}`, subtitle }),
  },
})
