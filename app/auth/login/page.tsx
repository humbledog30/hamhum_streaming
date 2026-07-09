"use client";
import { LoginForm } from "@/components/login-form";
import AuthHeroSection from "@/components/section/auth-hero-section";
import { Dot } from "lucide-react";
import { Suspense, useCallback, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/brand-logo";
import BannerOverlay from "@/components/banner-overlay";
import StreamingIndicator from "@/components/streaming-indicator";

const bannerList = [
	{
		src: "/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg",
		alt: "The Wild Robot",
	},
	{
		src: "/u53UYu5XG2hNgWGvs3xGhAVzypl.jpg",
		alt: "Hoppers",
	},
	{
		src: "/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
		alt: "Elementals",
	},
	{
		src: "/zMwhWailP1WY7sb6AoE6b8ugoy.jpg",
		alt: "Swapped",
	},
];

export default function Page() {
	const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

	const paginationRef = useCallback((node: HTMLDivElement | null) => {
		setPaginationEl(node);
	}, []);
	return (
		<div className="flex min-h-svh w-full ">
			<div className="w-full min-h-svh grid grid-cols-1 md:grid-cols-[1fr_auto]">
				<div className="w-full h-full min-h-150 relative overflow-hidden">
					<div className="absolute z-0 w-full h-full">
						<Suspense>
							<AuthHeroSection items={bannerList} paginationEl={paginationEl} />
						</Suspense>
					</div>

					<BannerOverlay />
					<div className="section-container py-5 h-full z-20  relative flex flex-col justify-end pb-10">
						<div className="flex gap-2 items-center font-semibold mb-auto">
							<BrandLogo />
							<p className="font-jetbrains-mono text-xs uppercase border-l border-primary pl-2">
								Your personal cinema
							</p>
						</div>
						<div className="py-5 max-w-md">
							<StreamingIndicator />
						</div>
						<p className="text-3xl md:text-5xl italic font-fraunces text-foreground transition-all duration-250 font-bold max-w-lg">
							"Stories aren't just watched—they're lived."
						</p>
						<div className="flex justify-between flex-wrap items-end gap-5 py-5 max-w-4xl">
							<p className="text-muted-foreground max-w-full md:max-w-[75%]">
								Discover breathtaking worlds, unforgettable characters, and moments
								that become memories.
							</p>
						</div>
						<div
							ref={paginationRef}
							className="hidden lg:flex hero-pagination z-30 gap-2 pt-5"
						/>
					</div>
				</div>

				<div className="w-full h-full lg:w-md">
					<Suspense>
						<LoginForm />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
