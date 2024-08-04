/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost", "127.0.0.1"],
	},
	transpilePackages: [
		"antd",
		"@ant-design",
		"rc-util",
		"rc-pagination",
		"rc-picker",
		"rc-notification",
		"rc-tooltip",
		"rc-tree",
		"rc-table",
	],
};

export default nextConfig;
