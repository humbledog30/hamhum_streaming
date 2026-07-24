import { Skeleton } from "@/components/ui/skeleton";

const BannerSectionSkeleton = () => {
	return (
		<section className="w-full h-fit min-h-[80vh] flex flex-col relative overflow-hidden">
			<div className="w-full flex-1 flex flex-col relative">
				{/* <Skeleton className="w-full h-130 absolute z-0 rounded-none opacity-5" /> */}

				<div className="section-container flex-1 z-20 relative flex item items-end gap-5 md:gap-8 flex-wrap pt-20 pb-10 bottom-15">
					<Skeleton className="aspect-2/3 h-50 sm:h-70 md:h-80 lg:h-90 rounded-xl" />

					<div className="flex-1 flex-col flex gap-3">
						<Skeleton className="h-12 md:h-14 w-3/4 max-w-125" />

						<div className="flex gap-3 items-center">
							<Skeleton className="h-6 w-24 rounded-md" />
							<Skeleton className="h-4 w-12" />
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-14" />
						</div>

						<div className="flex gap-1">
							<Skeleton className="h-6 w-16 rounded-2xl" />
							<Skeleton className="h-6 w-20 rounded-2xl" />
							<Skeleton className="h-6 w-14 rounded-2xl" />
						</div>

						<div className="max-w-full md:max-w-200 space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
						</div>

						<div className="flex gap-2 items-center mt-5 flex-wrap">
							<Skeleton className="h-11 w-36 rounded-md" />
							<Skeleton className="h-11 w-36 rounded-md" />
							<Skeleton className="size-11 rounded-full" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BannerSectionSkeleton;
