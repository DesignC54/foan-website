import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "FOAN Group",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "REPLACE_ME",
  dataset: "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
