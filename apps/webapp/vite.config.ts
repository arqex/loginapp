import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcssCustomMedia from "postcss-custom-media";
import postcssNesting from "postcss-nesting";
import postcssGlobalData from "@csstools/postcss-global-data";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssGlobalData({
          files: ["./src/postcssGlobals.css"],
        }),
        postcssCustomMedia(),
        postcssNesting(),
      ],
    },
  },
});
