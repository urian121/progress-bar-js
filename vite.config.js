import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ProgressLoaderJS",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      output: {
        format: "es",
        entryFileNames: "index.js",
        preserveModules: false,
      },
    },
    minify: false, // Deshabilitar minificación para mejor debugging
  },
  plugins: [
    dts({
      outputDir: "dist",
      include: ["src/index.ts"],
    }),
  ],
});
