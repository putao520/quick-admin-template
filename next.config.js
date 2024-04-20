await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 6000,
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["zh-cn"],
    defaultLocale: "zh-cn",
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
};
export default config;
