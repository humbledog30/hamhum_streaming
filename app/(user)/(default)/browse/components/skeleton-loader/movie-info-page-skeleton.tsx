"use client";
import { Skeleton } from "@/components/ui/skeleton";
import BannerSectionSkeleton from "./banner-section-skeleton";
import DetailsSkeleton from "./details-skeleton";
import OtherDetailsSkeleton from "./other-details-skeleton";
import CastCrewSkeleton from "./cast-crew-skeleton";
import { useEffect } from "react";

const MovieInfoPageSkeleton = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant",
		});
	}, []);
	return (
		<div className="w-full flex flex-col">
			{/* Info page Banner section */}
			<BannerSectionSkeleton />

			<div className="section-container flex flex-col gap-10">
				{/* Details */}
				<div>
					<div className="flex items-center gap-5 mb-5">
						<h6 className="section-title text-nowrap flex items-center gap-3">
							Details
						</h6>
						<div className="border-b border-foreground/80 w-full" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10">
						<div className="col-span-2 flex flex-col gap-3 justify-center">
							<DetailsSkeleton itemCount={5} /> {/* Cast */}
							<DetailsSkeleton itemCount={1} /> {/* Director */}
							<DetailsSkeleton itemCount={2} /> {/* Writers */}
							<DetailsSkeleton itemCount={3} /> {/* Genres */}
						</div>

						<div className="col-span-1 flex flex-col gap-3 p-5 px-7 bg-chart-5/40 rounded-2xl">
							<OtherDetailsSkeleton /> {/* Audience Score */}
							<OtherDetailsSkeleton /> {/* Release Year */}
							<OtherDetailsSkeleton /> {/* Runtime */}
							<OtherDetailsSkeleton /> {/* Rating */}
						</div>
					</div>
				</div>

				{/* Cast & Crew */}
				<div>
					<div className="flex items-center gap-5 mb-5">
						<Skeleton className="h-6 w-32" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10">
						<div className="col-span-2">
							<CastCrewSkeleton count={12} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieInfoPageSkeleton;
