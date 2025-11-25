import { defineField, defineType } from 'sanity';

export const tabsSection = defineType({
  name: 'tabsSection',
  title: 'Tabs Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'This title will show above the tab section',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        defineField({
          name: 'tab',
          title: 'Tab',
          type: 'object',
          fields: [
            // Button field
            defineField({
              name: 'buttonHeading',
              title: 'Tab Button Heading',
              type: 'string',
              description: 'This text will appear on the tab button',
            }),

            // Content fields
            defineField({
              name: 'contentHeading',
              title: 'Tab Content Heading',
              type: 'string',
              description: 'This heading will appear in the tab content',
            }),
            defineField({
              name: 'description',
              title: 'Tab Content Description',
              type: 'text',
              description: 'This text will appear in the tab content',
            }),
            defineField({
              name: 'image',
              title: 'Tab Content Image',
              type: 'image',
              options: { hotspot: true },
              description: 'This image will appear on the left side of the tab content',
            }),
          ],
        }),
      ],
    }),
  ],
});
