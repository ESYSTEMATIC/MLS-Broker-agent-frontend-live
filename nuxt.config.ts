// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      titleTemplate: "MLS | %s",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.png",
        },
      ],
      script: [{ src: "/wow.js" }],
    },
  },

  css: [
    "~/css/animation/animate.css",
    "~/css/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      // baseURL: "https://mls-agent.products.aait-d.com/api",
      // baseURL: "https://api.egymls.com/api",
      // baseURL: "https://backend.realestate.gov.eg/api/v1/agent-platform",
      baseURL: "https://mls-backend.addictaco.website/api/v1/agent-platform",
      gtm: {
        id: 'GTM-P3SKLNGR', // Replace with your actual GTM ID
        pageTracking: true, // Enables automatic page view tracking
        noscript: true // Adds the <noscript> GTM iframe in <body>
      }
    },
  },

  modules: [
    // "@nuxtjs/gtm",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          {
            name: "English",
            code: "en",
            iso: "en-US",
            file: "en.json",
          },
          {
            name: "عربي",
            code: "ar",
            iso: "ar-AR",
            file: "ar.json",
          },
        ],
        lazy: true,
        detectBrowserLanguage: false,
        langDir: "locales/",
        defaultLocale: "en",
        precompile: {
          strictMessage: true,
        },
        vueI18nLoader: true,
      },
    ],
    "@pinia/nuxt",
    "nuxt-swiper",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "@nuxtjs/color-mode",
  ],

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  plugins: [
    "~/plugins/i18n.client.js",
    { src: "~/plugins/vue-signature.client.js", mode: "client" },
    { src: "~/plugins/vue-toastification.client.js", mode: "client" },
    { src: "~/plugins/fontawesome.client.js", mode: "client" },
    { src: "~/plugins/VueDatePicker.client.js", mode: "client" },
  ],

  build: {
    transpile: [
      "vue-toastification",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
      "@vuepic/vue-datepicker",
      "@vuepic/vue-datepicker",
      "vue3-signature",
    ],
  },

  dev: true,

  devServer: {
    https: false,
    host: "0.0.0.0",
    port: 9020,
  },

  compatibilityDate: "2024-07-10",
});
