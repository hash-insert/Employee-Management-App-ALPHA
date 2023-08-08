import { defineConfig, createServer } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base:"https://fluffy-halva-49f833.netlify.app/",
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});
