import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	allowedDevOrigins: ["192.168.0.101", "192.168.0.103", "127.0.0.1", "192.168.0.107"],
	images: {
		domains: ["image.tmdb.org"],
	},
};

export default nextConfig;
