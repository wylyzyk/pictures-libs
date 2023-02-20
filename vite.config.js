import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = loadEnv("development", process.cwd());

  return {
    plugins: [
      vue(),
      vueJsx({
        esbuild: {
          jsxInject: `import React from 'react'`,
          jsxFactory: "h",
          jsxFragment: "Fragment"
        }
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbol id
        symbolId: "icon-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true
        }
      },
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  };
});
