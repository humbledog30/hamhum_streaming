import { Suspense } from "react";
import ProfileContent from "./components/profile-content";
import ProfileContentSkeleton from "./components/SkeletonLoader/profile-content-skeleton";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import ProfileAccountConnected from "./components/profile-account-connected";
import { Search } from "lucide-react";
import { ProfileSectionSkeleton } from "./components/SkeletonLoader/profile-section-skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const ViewProfilePage = () => {
	return (
		<div className="w-full max-w-180 flex flex-col gap-15 px-5 mx-auto py-10 mt-10 text-foreground relative">
			<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-130 max-w-full h-100 lg:h-80 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)]" />
			<div>
				<Suspense fallback={<ProfileContentSkeleton />}>
					<ProfileContent />
				</Suspense>
				<div className="flex gap-3 justify-center mt-5">
					<Link
						className="px-5 primary-btn flex items-center rounded-md"
						href={"/profile/settings"}
					>
						Edit profile
					</Link>
					<LogoutButton />
				</div>
			</div>
			<div className="flex flex-col gap-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border bg-accent/20 px-4 text-center rounded-xl">
					<div className="py-4">
						<p className="font-fraunces font-semibold text-xl md:text-2xl">312</p>
						<span className="">Titles watched</span>
					</div>
					<div className="border-x py-4">
						<p className="font-fraunces font-semibold text-xl md:text-2xl">32</p>
						<span className="">In watchlist</span>
					</div>
					<div className="py-4">
						<p className="font-fraunces font-semibold text-xl md:text-2xl">1,299</p>
						<span className="">Hours watched</span>
					</div>
				</div>
				<Suspense fallback={<ProfileSectionSkeleton />}>
					<ProfileAccountConnected />
				</Suspense>
				<Separator />
				<div className="flex flex-col gap-1">
					<span className="text-primary uppercase text-sm">— Taste</span>
					<p className="font-fraunces text-xl font-semibold">Favorite genres</p>
					<div className="flex flex-wrap gap-3 text-sm mt-4">
						<span className="border bg-accent/20 p-1 px-4 rounded-2xl">Sci-Fi</span>
						<span className="border bg-accent/20 p-1 px-4 rounded-2xl">Thriller</span>
						<span className="border bg-accent/20 p-1 px-4 rounded-2xl">Animation</span>
						<span className="border bg-accent/20 p-1 px-4 rounded-2xl">
							Documentary
						</span>
						<span className="border bg-accent/20 p-1 px-4 rounded-2xl">Comedy</span>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col gap-1">
					<span className="text-primary uppercase text-sm">— Activity</span>
					<p className="font-fraunces text-xl font-semibold">Genres you watch</p>
					<div className="mt-4">
						<div className="grid  grid-cols-[auto_1fr_50px] gap-x-5 gap-y-1 items-center text-muted-foreground">
							<span>Sci-Fi</span>
							<div className="h-2 w-full bg-primary/10 rounded-2xl">
								<div className="h-2 bg-primary w-[82%] relative z-10 rounded-2xl" />
							</div>
							<span className="text-right">82%</span>

							<span>Thriller</span>
							<div className="h-2 w-full bg-primary/10 rounded-2xl">
								<div className="h-2 bg-primary w-[64%] relative z-10 rounded-2xl" />
							</div>
							<span className="text-right">64%</span>

							<span>Comedy</span>
							<div className="h-2 w-full bg-primary/10 rounded-2xl">
								<div className="h-2 bg-primary w-[47%] relative z-10 rounded-2xl" />
							</div>
							<span className="text-right">47%</span>

							<span>Documentary</span>
							<div className="h-2 w-full bg-primary/10 rounded-2xl">
								<div className="h-2 bg-primary w-[31%] relative z-10 rounded-2xl" />
							</div>
							<span className="text-right">31%</span>

							<span>Animation</span>
							<div className="h-2 w-full bg-primary/10 rounded-2xl">
								<div className="h-2 bg-primary w-[19%] relative z-10 rounded-2xl" />
							</div>
							<span className="text-right">19%</span>
						</div>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col gap-1">
					<span className="text-primary uppercase text-sm">— Activity</span>
					<p className="font-fraunces text-xl font-semibold">Recently searched</p>
					<div className="flex flex-wrap gap-3 text-sm mt-4 text-muted-foreground">
						<span className="border p-1 px-4 rounded-2xl flex gap-2 items-center">
							<Search size={12} />
							Recently searched
						</span>
						<span className="border p-1 px-4 rounded-2xl flex gap-2 items-center">
							<Search size={12} />
							slow burn thrillers
						</span>
						<span className="border p-1 px-4 rounded-2xl flex gap-2 items-center">
							<Search size={12} />
							burn thrillers
						</span>
						<span className="border p-1 px-4 rounded-2xl flex gap-2 items-center">
							<Search size={12} />
							Nightbloom
						</span>
						<span className="border p-1 px-4 rounded-2xl flex gap-2 items-center">
							korean movie
						</span>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col gap-1">
					<span className="text-primary uppercase text-sm">— Activity</span>
					<p className="font-fraunces text-xl font-semibold">Recently watched</p>
					<ul className="flex flex-col gap-4 mt-4">
						<li className="capitalize flex gap-3 items-center not-last:pb-4 not-last:border-b border-muted-foreground/30 text-muted-foreground">
							<span>Aurora Fields</span>
							<span className="ml-auto text-foreground">Yesterday</span>
						</li>
						<li className="capitalize flex gap-3 items-center not-last:pb-4 not-last:border-b border-muted-foreground/30 text-muted-foreground">
							<span>The Long Static</span>
							<span className="ml-auto text-foreground">3 days ago</span>
						</li>
						<li className="capitalize flex gap-3 items-center not-last:pb-4 not-last:border-b border-muted-foreground/30 text-muted-foreground">
							<span>Nightbloom, S2</span>
							<span className="ml-auto text-foreground">Last week</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ViewProfilePage;
