import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";
import { PlayIcon } from "@sanity/icons/Play";

const galleryCategories = ["Events", "Leadership", "Community", "Production", "Spaces"];

// Gallery photo → /gallery/
export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery photo",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      description: 'Short and specific, e.g. "Partnership signing, Dubai".',
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: galleryCategories, layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date taken",
      description: "Only the month and year are shown.",
      type: "date",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});

// Video tour → /video-tours/
export const videoTour = defineType({
  name: "videoTour",
  title: "Video tour",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube link",
      description:
        "Upload the video to the FOAN YouTube channel (it can be Unlisted), then paste its link here.",
      type: "url",
      validation: (r) =>
        r.required().custom((v) =>
          !v || /youtu\.?be/.test(v) ? true : "Please paste a YouTube link",
        ),
    }),
    defineField({
      name: "poster",
      title: "Cover photo",
      description: "Landscape photo shown before the video plays.",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: galleryCategories, layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: 'e.g. "Uyo, Nigeria"',
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Length",
      description: 'Minutes:seconds, e.g. "04:32"',
      type: "string",
      validation: (r) =>
        r.regex(/^\d{1,2}:\d{2}$/, { name: "mm:ss" }),
    }),
    defineField({
      name: "order",
      title: "Order in the lineup",
      description: "Lower numbers show first. The first one plays on the main stage.",
      type: "number",
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: "Lineup order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "duration", media: "poster" },
  },
});
