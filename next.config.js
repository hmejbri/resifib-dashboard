/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost"],
	},
	env: {
		API: "http://localhost:3001/api/",
	},
};

module.exports = nextConfig;
