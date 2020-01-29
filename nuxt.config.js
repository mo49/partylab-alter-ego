import webpack from 'webpack'

const { resolve } = require('path');

const baseName = 'baseName'
const baseDesc = 'baseDesc'
const subDir = 'brandname'
const baseUrl = `https://ja.nuxtjs.org/${subDir}`
const baseOgp = '/image/ogp'
const appId = ''
const twitterId = ''

export default {
  mode: 'universal',
  env: {
    baseName: baseName,
    baseDesc: baseDesc,
    baseUrl: baseUrl,
    baseOgp: baseOgp,
    twitterId: twitterId,
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: baseName || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: baseDesc },
      // og
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:title', property: 'og:title', content: baseName },
      { hid: 'og:description', property: 'og:description', content: baseDesc },
      { hid: 'og:image', property: 'og:image', content: `${baseUrl}${baseOgp}/OGP.png` },
      { hid: 'fb:app_id', content: appId },
      // twitter
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', property: 'twitter:title', content: baseName },
      { hid: 'twitter:description', property: 'twitter:description', content: baseDesc },
      { hid: 'twitter:image', property: 'twitter:image', content: `${baseUrl}${baseOgp}/OGP.png` },
      { hid: 'twitter:site', property: 'twitter:site', content: `@${twitterId}` },
      { hid: 'twitter:creator', property: 'twitter:creator', content: `@${twitterId}` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}/favicon.ico` }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'reset-css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/dayjs',
    '~/plugins/vue-scrollto',
    '~/plugins/isFromIpad',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-user-agent',
    ['nuxt-i18n',
      {
        locales: [
          { code: 'ja', iso: 'ja_JP' },
          { code: 'en', iso: 'en-US' },
        ],
        defaultLocale: 'ja',
        vueI18n: {
          fallbackLocale: 'ja',
        },
        vueI18nLoader: true
      }
    ]
  ],
  styleResources: {
    scss: [
      '~/assets/sass/_variable.scss',
      '~/assets/sass/_mixin.scss'
    ]
  },

  router: {
    base: process.env.NODE_ENV === 'dev' ? '' : `/${subDir}`
  },
  generate: {
    dir: resolve(__dirname, './dist/' + subDir),
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      }),
    ],
    extend(config, ctx) {
    },
    vender: ['axios'],
  }
}
