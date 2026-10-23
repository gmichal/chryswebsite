import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig(config, {
  testDir: "./tests/github-pages",
  testIgnore: [],
  use: { baseURL: "http://127.0.0.1:4174/chryswebsite/" },
  webServer: {
    command: "npm run preview",
    url: "http://127.0.0.1:4174/chryswebsite/",
    env: { PORT: "4174", NEXT_PUBLIC_BASE_PATH: "/chryswebsite" },
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
