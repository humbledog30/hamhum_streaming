import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import Tmdb from "@/components/tmdb";
import MainNavigation from "@/components/nav/main-navigation";
import HeroSection from "@/components/section/hero-section";
import BrowseGenre from "@/components/section/browse-genre";
import Trending from "@/components/section/trending";
import UpcomingSection from "@/components/section/upcoming-section";
import PopularSection from "@/components/section/popular-section";
import AllTimeGreat from "@/components/section/all-time-great";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className="flex-1 w-full flex flex-col items-center ">
				<MainNavigation />
				<div className="mt-16 w-full gap-10 flex flex-col">
					<HeroSection />
					<Trending />
					<PopularSection />
					<AllTimeGreat />
					<UpcomingSection />
					<BrowseGenre />
					<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
						<p>
							Powered by{" "}
							<a
								href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
								target="_blank"
								className="font-bold hover:underline"
								rel="noreferrer"
							>
								Supabase
							</a>
						</p>
						<ThemeSwitcher />
					</footer>
				</div>
			</div>
		</main>
	);
}
