import prismjs from "vite-plugin-prismjs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  devServer: {
    // port: 80,
    // https: {
    //   key: "./ssl/server.key",
    //   cert: "./ssl/server.crt",
    // },
  },

  spaLoadingTemplate: "./spa-loading-template.html",
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      // apiBase: "http://123.207.217.103:8080/api",
      // imgBase: "http://123.207.217.103:8080/api/img",
      apiBase: "http://127.0.0.1:8080/api",
      imgBase: "http://127.0.0.1:8080/api/img",
    },
  },
  modules: ["@element-plus/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/fonts/font.css",
    "~/assets/icon/icon.css",
  ],
  vite: {
    plugins: [
      prismjs({
        languages: [
          "go",
          "css",
          "bash",
          "shell",
          "sql",
          "dockerfile",
          "docker",
          "git",
          "json",
          "typescript",
          "javascript",
          "html",
        ],
      }),
    ],
  },
  routeRules: {
    // 管理仪表板仅在客户端渲染
    "/admin/**": { ssr: false },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
