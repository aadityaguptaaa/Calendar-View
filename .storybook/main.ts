import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    // Tailwind alias support
    config.resolve = {
      ...config.resolve,
      alias: {
        "@": "/src",
      },
    };
    return config;
  },
};
export default config;
