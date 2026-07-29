import { ThemeSwitcher } from "@/components/theme-switcher";

import MainNavigation from "@/components/nav/main-navigation";
import HeroSection from "@/components/section/hero-section";
import BrowseGenre from "@/components/section/browse-genre";
import Trending from "@/components/section/trending";
import UpcomingSection from "@/components/section/upcoming-section";
import PopularSection from "@/components/section/popular-section";
import AllTimeGreat from "@/components/section/all-time-great";
import Footer from "@/components/section/footer";
import { Suspense } from "react";
import BannerSliderSkeleton from "@/components/skeleton-loader/banner-slider-skeleton";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className="flex-1 w-full flex flex-col items-center ">
				<MainNavigation />
				<div className="mt-16 w-full gap-10 flex flex-col">
					<Suspense fallback={<BannerSliderSkeleton />}>
						<HeroSection />
					</Suspense>
					{/* <Trending /> */}
					<PopularSection />
					<AllTimeGreat />
					<UpcomingSection />
					<BrowseGenre />
					<Footer />
				</div>
			</div>
		</main>
	);
}
