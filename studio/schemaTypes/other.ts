import { defineField, defineType } from "sanity";
import { BulbOutlineIcon, CaseIcon, DownloadIcon } from "@sanity/icons";

// Press release (links to the outside article) → /press-releases/
export const pressRelease = defineType({
  name: "pressRelease",
  title: "Press release",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Link to the article",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Publication",
      description: 'Shown under the headline, e.g. "guardian.ng".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "source" } },
});

// Open role → /careers/
export const role = defineType({
  name: "role",
  title: "Job opening",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mode",
      title: "Work type",
      type: "string",
      options: { list: ["On-site", "Hybrid", "Remote"], layout: "radio", direction: "horizontal" },
      initialValue: "On-site",
    }),
    defineField({
      name: "url",
      title: "Application link",
      description: "The Jobylon (or other) page where people apply.",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "mode" } },
});

// Downloadable document → /resources/
export const resource = defineType({
  name: "resource",
  title: "Download",
  type: "document",
  icon: DownloadIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 10,
    }),
  ],
});
