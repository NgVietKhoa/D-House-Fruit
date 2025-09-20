// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Quicksand: [300, 400, 500, 600, 700],
      Poppins: [300, 400, 500, 600, 700]
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: "D'House Fruit - Hoa quả nhập khẩu cao cấp",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "D'House Fruit - Chuyên cung cấp hoa quả nhập khẩu cao cấp và giỏ quà tặng sang trọng" }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png?v=1', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png?v=1', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/images/favicon.png?v=1', sizes: '180x180' },
        { rel: 'shortcut icon', href: '/images/favicon.png?v=1' }
      ]
    }
  }
})
