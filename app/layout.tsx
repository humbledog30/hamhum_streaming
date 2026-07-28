import type { Metadata } from "next";
import { Fraunces, Geist, Inter, JetBrains_Mono, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_TOAST_DURATION } from "@/components/app-toast";
import { GlobalSpotlight } from "@/components/global-spotlight";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Ham+Hum | Homepage",
	description:
		"Unlimited movies and series. Any device, anytime. New titles added every week — your next favorite is just a click away.",
};

const fraunces = Fraunces({
	variable: "--font-fraunces",
	display: "swap",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	display: "swap",
	subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	display: "swap",
	subsets: ["latin"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} ${fraunces.variable} ${jetbrains.variable} ${outfit.variable} antialiased `}
			>
				{/* <GlobalSpotlight /> */}
				<Providers>{children}</Providers>
				<Toaster
					position="top-center"
					gap={10}
					toastOptions={{ unstyled: true }}
					duration={DEFAULT_TOAST_DURATION}
					visibleToasts={3}
					expand={true}
				/>
			</body>
		</html>
	);
}
