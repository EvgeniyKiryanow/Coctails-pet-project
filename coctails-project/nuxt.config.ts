// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  vite: {
    server: {
      hmr: false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      },
    },
  },
  vue: {
    propsDestructure: true,
  },
});
