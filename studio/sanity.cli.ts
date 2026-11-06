import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "8km87koc",
    dataset: "production",
  },
  studioHost: "foangroup",
  deployment: { appId: "iaphds3u6fq8rir4x2u8r147", autoUpdates: true },
});
