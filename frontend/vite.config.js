import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://blog-app-2ell.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),

        configure: (proxy, options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Request sent to target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Response received from target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
  plugins: [react()],
});
