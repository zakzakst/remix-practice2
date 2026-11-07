import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./swagger/bundle.yaml",
  output: {
    path: "./swagger/generated",
    entryFile: false,
  },
  plugins: ["@hey-api/typescript"],
});
