import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-next",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpack: config => {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            babel: true,
            titleProp: true,
          },
        },
        {
          loader: require.resolve('url-loader'),
          options: {
            name: '[name].[hash:8].[ext]',
            limit: 10240,
          },
        },
      ],
    });

    return config;
  },
  webpackFinal: async (config) => {
    if (config.resolve)
      config.resolve.alias = {
        ...config.resolve.alias,
        'next-i18next': 'react-i18next'
      }
    return config
  },
};

export default config;
