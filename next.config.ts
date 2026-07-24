import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: false,
	allowedDevOrigins: ["192.168.0.101", "192.168.0.103", "127.0.0.1", "192.168.0.107"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				port: "",
				pathname: "/t/p/**",
			},
		],
	},
};

export default nextConfig;
