// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: '/blog-site/',
    head: {
      title: 'モダンブログサイト',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt & TailwindCSSで作成したモダンなブログサイト' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/blog-site/favicon.ico' }
      ]
    }
  },
  ssr: true
})
