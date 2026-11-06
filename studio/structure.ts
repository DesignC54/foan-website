import type { StructureResolver } from "sanity/structure";

// Sidebar in the order editors think about the site.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("category").title("Blog categories"),
      S.divider(),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("videoTour").title("Video tours"),
      S.divider(),
      S.documentTypeListItem("pressRelease").title("Press releases"),
      S.documentTypeListItem("role").title("Job openings"),
      S.documentTypeListItem("resource").title("Downloads"),
    ]);
