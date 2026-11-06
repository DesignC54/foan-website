import { defineArrayMember, defineField, defineType } from "sanity";
import { LockIcon } from "@sanity/icons/Lock";

// Privacy Policy, Terms of Service, Cookie Policy → /<slug>/
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  icon: LockIcon,
  fields: [
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms of Service", value: "terms-of-service" },
          { title: "Cookie Policy", value: "cookie-policy" },
        ],
      },
      readOnly: ({ document }) => Boolean(document?._createdAt),
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "One sentence for Google and link previews.",
      type: "string",
    }),
    defineField({
      name: "updated",
      title: "Last updated",
      description: "Change this whenever the wording changes. It shows at the top of the page.",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          lists: [{ title: "Bullets", value: "bullet" }],
          marks: { decorators: [], annotations: [] },
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "updated" } },
});
