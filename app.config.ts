export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue-ribbon",
      neutral: "zinc",
    },
    modal: {
      variants: {
        fullscreen: {
          false: {
            content: "sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-2xl",
          },
        },
      },
    },
  },
});
