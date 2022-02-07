/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cravatar.eu'],
		formats: ['image/avif', 'image/webp'],
	},
};

module.exports = nextConfig;
