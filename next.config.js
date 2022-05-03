/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com"],
	},
	env: {
		API: "https://resifib-dashboard.herokuapp.com/api/",
	},
};

module.exports = nextConfig;
