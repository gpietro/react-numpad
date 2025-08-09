module.exports = {
	stories: ["../stories/**/*.js"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	features: {
		storyStoreV7: true,
	},
};
