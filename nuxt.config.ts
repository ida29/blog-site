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
      title: 'yidaのtechブログ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'エンジニアyidaの技術ブログ。Web開発、プログラミング、新技術について発信しています。' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/blog-site/favicon.ico' }
      ],
      script: [
        {
          innerHTML: `
            (function() {
              const isDark = localStorage.getItem('darkMode') === 'true' || 
                            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDark) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          type: 'text/javascript'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    }
  },
  ssr: true,
  nitro: {
    prerender: {
      failOnError: false,
      routes: ['/']
    }
  }
})