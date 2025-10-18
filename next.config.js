import path from 'node:path'

await import('./src/env.js')
const webpackModule = await import('next/dist/compiled/webpack/webpack.js')
if (typeof webpackModule.init === 'function') {
  webpackModule.init()
}
const webpack = webpackModule.default || webpackModule
const { IgnorePlugin } = webpack.webpack

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 6000,
  i18n: {
    locales: ['zh-cn'],
    defaultLocale: 'zh-cn',
  },
  images: {
    loader: 'custom',
    loaderFile: './src/types/image/loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (webpackConfig) => {
    webpackConfig.resolve = webpackConfig.resolve ?? {}
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@mui/x-data-grid/esm/index.css': path.resolve('./styles/empty.css'),
    }
    webpackConfig.plugins = webpackConfig.plugins ?? []
    webpackConfig.plugins.push(
      new IgnorePlugin({ resourceRegExp: /@mui\/x-data-grid\/esm\/index\.css$/ }),
    )
    return webpackConfig
  },
}
export default config
