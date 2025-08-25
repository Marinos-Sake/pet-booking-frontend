import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // default Vite
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot backend
        changeOrigin: true,
        // Note: In practice this proxy is not used because all requests go through VITE_API_URL.
        // Leave it here just for convenience in dev environments or as a fallback if needed.

      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
