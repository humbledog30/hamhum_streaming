import { Skeleton } from "@/components/ui/skeleton";

export const BrowsePageSkeleton = () => {
	return (
		<>
			<section className="relative w-full">
				<div className="absolute inset-0 bg-background">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_15%_0%,hsl(var(--primary)/0.30),transparent_60%)]" />
					<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
				</div>
				<div className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10">
					<div className="flex items-center gap-3">
						<Skeleton className="h-6 w-6 rounded-full" />
						<Skeleton className="h-4 w-40" />
					</div>

					<div className="space-y-3">
						<Skeleton className="h-14 w-full max-w-175" />
						<Skeleton className="h-14 w-[85%] max-w-150" />
					</div>

					<div className="mt-4 space-y-2">
						<Skeleton className="h-5 w-full max-w-137.5" />
						<Skeleton className="h-5 w-[80%] max-w-112.5" />
					</div>
				</div>
			</section>

			<div className="sticky top-16 z-40 border-b bg-background/90 backdrop-blur">
				<div className="section-container flex gap-3 overflow-hidden py-2">
					{Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="flex shrink-0 items-center gap-2 px-5 py-3">
							<Skeleton className="h-5 w-16" />
							<Skeleton className="h-5 w-8 rounded-full" />
						</div>
					))}
				</div>
			</div>

			<section className="section-container flex flex-col gap-15 py-8">
				{Array.from({ length: 5 }).map((_, section) => (
					<div key={section} className="flex flex-col gap-y-5">
						<div className="flex items-center gap-5">
							<Skeleton className="h-8 w-44" />
							<div className="flex-1">
								<Skeleton className="h-px w-full" />
							</div>
							<Skeleton className="h-5 w-20" />
						</div>

						<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
							{Array.from({ length: 10 }).map((_, movie) => (
								<div key={movie} className="text-center">
									<Skeleton className="aspect-2/3 w-full rounded-xl" />

									<div className="mt-3 flex flex-col items-center gap-2">
										<Skeleton className="h-5 w-4/5" />
										<Skeleton className="h-4 w-2/5" />
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</section>
		</>
	);
};
