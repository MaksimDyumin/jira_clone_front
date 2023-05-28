import { Head } from "nuxt/dist/head/runtime/components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }
      ]
    }
  },
  ssr: false,
  css: [
    "primevue/resources/themes/lara-light-indigo/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    'primeflex/primeflex.css',
    "assets/scss/main.scss",
  ],
  modules:[
    '@/modules/ngrok/index.js',
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  build: {
		transpile: ["primevue"],
    
	},
  plugins:[
    'plugins/primevue.js',
    'plugins/axios.js',
  ],
})
