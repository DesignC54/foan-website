import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

// Blog post → /blog/ and /blog/<slug>/
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description:
        'The end of the page link, e.g. "january-progress-report". Click Generate after typing the title.',
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "Pick one or more. The blog filter uses these.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "mainImage",
      title: "Main photo",
      description: "Shown at the top of the article and on the blog card. Landscape works best.",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      description: "Two or three sentences for the blog card and Google. Leave empty to use the start of the article.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "body",
      title: "Article",
      description:
        'Write the article. Use "Heading" for section titles and "Quote" for a highlighted pull quote.',
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Supporting photos",
      description: "Optional. Shown under the article as a photo grid. Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", media: "mainImage" },
    prepare: ({ title, date, media }) => ({ title, subtitle: date, media }),
  },
});

export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers show first in the filter.",
      type: "number",
      initialValue: 10,
    }),
  ],
});
