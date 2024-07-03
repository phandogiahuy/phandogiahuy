import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: { //Configuration for the rollup plugin to minimize the chunk size
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Add react and react-dom here
        },
      },
    },
  },
});
