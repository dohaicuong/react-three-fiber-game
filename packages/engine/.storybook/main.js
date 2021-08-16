module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  managerEntries: [
    '@storybook/addon-console/register'
  ],
  addons: [
    '@storybook/preset-create-react-app',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // '@storybook/addon-console',
  ]
}