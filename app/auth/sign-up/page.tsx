"use client";
import BrandLogo from "@/components/brand-logo";
import AuthHeroSection from "@/components/section/auth-hero-section";
import { SignUpForm } from "@/components/sign-up-form";
import { Check, Dot } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useCallback } from "react";

const bannerList = [
	{ src: "/6ekykPwvAywJRjFEnUoCFWTO9O3.jpg", alt: "Perfect Crown" },
	{ src: "/epq6I0AwVaHldCrQ6xJ5ZsAyHCF.jpg", alt: "Hotel Del Luna" },
	{ src: "/yBmqsAFjJJtdHkptwlCy0WMsfKA.jpg", alt: "Scarlet Heart: Ryeo" },
	{
		src: "/smSbK5cd8T9XHcxEUcems23BDEF.jpg",
		alt: "Guardian: The Lonely and Great God",
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

					<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.18),transparent_55%)]" />
					<div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,hsl(var(--background)/0.05)_0%,hsl(var(--background)/0.55)_58%,hsl(var(--background)/1)_100%)]" />
					<div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,hsl(var(--background)/0.75)_0%,hsl(var(--background)/0.15)_45%,hsl(var(--background)/0.05)_70%)]" />

					<div className="section-container py-5 h-full z-20 relative flex flex-col justify-end pb-10">
						<div className="flex gap-2 items-center font-semibold mb-auto">
							<BrandLogo />
							<p className="font-jetbrains-mono text-xs uppercase border-l border-primary pl-2">
								Your personal cinema
							</p>
						</div>
						<p className="text-3xl md:text-5xl italic font-fraunces text-foreground transition-all duration-250 font-bold max-w-lg">
							"Your own screening room — built around what you actually watch."
						</p>
						<div className="flex justify-between flex-wrap items-end gap-5 py-5 max-w-4xl">
							<p className="text-muted-foreground max-w-full md:max-w-[75%]">
								Join Ham+Hum and start building a watchlist that's yours — track
								what you've watched, curate what's next.
							</p>
						</div>
						<ul>
							<li className="flex gap-2 items-center">
								<Check size={15} className="text-primary" /> Personalized
								recommendations from TMDB
							</li>
							<li className="flex gap-2 items-center">
								<Check size={15} className="text-primary" /> Track what you've
								watched and want to watch
							</li>
							<li className="flex gap-2 items-center">
								<Check size={15} className="text-primary" /> Free, no credit card
								required
							</li>
						</ul>
						<div
							ref={paginationRef}
							className="hidden lg:flex hero-pagination z-30 gap-2 pt-10"
						/>
					</div>
				</div>

				<div className="w-full h-full lg:w-md">
					<Suspense>
						<SignUpForm />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
