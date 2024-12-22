// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: true,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    // cdnURL: "https://cdn.jsdelivr.net/npm/",
  },
  devServer: {
    port: 3000,
    // https: {
    //   key: "./ssl/localhost-key.pem",
    //   cert: "./ssl/localhost.pem",
    // },
  },
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      // apiBase: "http://123.207.217.103:8080/api",
      // imgBase: "http://123.207.217.103:8080/api/img",
      apiBase: "http://127.0.0.1:8080/api",
      // imgBase: "http://127.0.0.1:8080/api/img",
      imgGalleryBase: "http://127.0.0.1:8080/api/img/gallery",
      imgAvatarBase: "http://127.0.0.1:8080/api/img/avatar",
    },
  },
  modules: ["@element-plus/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/tailwind.css", "~/assets/scss/index.scss"],
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
  nitro: {
    routeRules: {},
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },
});
