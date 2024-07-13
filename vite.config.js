import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/token": {
        target: "http://localhost:6080", // NestJS 서버 주소
        changeOrigin: true,
      },
    },
  },
  baseUrl: "./public",
});
