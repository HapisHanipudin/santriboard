import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxtjs/google-fonts",
    // "@prisma/nuxt"
  ],
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
