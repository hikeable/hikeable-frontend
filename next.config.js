/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	async redirects() {
		return [
			{
				source: "/logout",
				destination: "/",
				permanent: true,
			},
		];
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
				},
			],
		});
		return config;
	},
	images: {
		disableStaticImages: true,
	},
};

module.exports = nextConfig;
