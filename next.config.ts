import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	allowedDevOrigins: ["192.168.0.101", "192.168.0.103"],
};

export default nextConfig;
