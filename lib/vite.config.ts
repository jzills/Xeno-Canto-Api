import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            outDir: "dist",
            rollupTypes: true
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "XenoCantoApi",
            fileName: "xeno-canto-api",
        },
        rollupOptions: {
            output: [{
                entryFileNames: "xeno-canto-api.js",
                format: "esm",
            },
            {
                entryFileNames: "xeno-canto-api.cjs",
                format: "cjs",
            }],
            external: ["tslib"],
        },
        target: "esnext"
    }
});
