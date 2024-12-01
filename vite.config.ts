/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    {
      name: "html-transform",
      transformIndexHtml(html: string) {
        // need to transform for local usage
        html = html.replace(
          "/@vite/client",
          `http://localhost:8080/@vite/client`
        );
        html = html.replace(
          "/@react-refresh",
          `http://localhost:8080/@react-refresh`
        );
        return html.replace("./src/main.tsx", `http://localhost:8080/src/main.tsx`);
      },
    },
    react(),
    {
      name: "isolation",
      // will need these to play with OPFS
      configureServer(server: any) {
        server.middlewares.use((_req: any, res: any, next: any) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      },
    },
  ],
  server: {
    port: 8080,
  },
});
