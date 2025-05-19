import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  
  },

  modules: ["@nuxt/ui", "@nuxt/fonts", // "@prisma/nuxt"
  "@nuxtjs/google-fonts", "@pinia/nuxt"],
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
});
