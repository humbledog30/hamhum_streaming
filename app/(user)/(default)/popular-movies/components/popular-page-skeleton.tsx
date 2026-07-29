import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function PopularMoviesLoading() {
	return (
		<div>
			{/* ── Hero ───────────────────────────────────────────── */}
			<section className="relative w-full">
				<div className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10">
					<span className="flex items-center gap-3">
						<Skeleton className="size-4 rotate-45" />
						<Skeleton className="h-4 w-56" />
					</span>

					<Skeleton className="h-16 w-full max-w-140" />

					<div className="mt-4 flex max-w-150 flex-col gap-2">
						<Skeleton className="h-5 w-full" />
						<Skeleton className="h-5 w-4/5" />
					</div>
				</div>
			</section>

			<section className="mx-auto section-container py-8 flex flex-col gap-10">
				{/* ── "This Week's Highest Rated" label ─────────────── */}
				<div className="flex gap-3 items-center">
					<Skeleton className="h-5 w-52" />
					<Separator className="flex-1" />
				</div>

				{/* ── Top 3 ranked grid ──────────────────────────────── */}
				<div className="grid grid-cols-1 sm:grid-cols-[1fr_1.22fr_1fr] gap-3 sm:items-end">
					{Array.from({ length: 3 }).map((_, index) => {
						const isCenter = index === 0;
						return (
							<div
								key={index}
								className={cn(
									index === 0 && "sm:order-2",
									index === 1 && "sm:order-1",
									index === 2 && "sm:order-3",
								)}
							>
								<div
									className={cn(
										"relative overflow-hidden rounded-md aspect-2/3",
										isCenter && "sm:aspect-3/4",
									)}
								>
									<Skeleton className="absolute inset-0 size-full rounded-none" />

									{/* rank numeral ghost */}
									<Skeleton className="absolute top-1 left-1 h-14 w-10 lg:h-20 lg:w-14 bg-foreground/10" />

									{/* rating badge */}
									<Skeleton className="absolute top-4 right-4 h-7 w-14 rounded-2xl" />

									{/* overlay text block */}
									<div className="absolute left-0 bottom-0 p-5 lg:p-8 w-full flex flex-col gap-3">
										<Skeleton className="h-3 w-24" />
										<Skeleton
											className={cn("w-3/4", isCenter ? "h-8" : "h-7")}
										/>
										<Skeleton className="h-3 w-16" />
										<div className="flex items-center gap-3 mt-2">
											<Skeleton className="h-5 w-10" />
											<Skeleton className="size-9 rounded-full ml-auto" />
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* ── "Also trending" label ─────────────────────────── */}
				<div className="flex gap-3 items-center">
					<Skeleton className="h-5 w-32" />
					<Separator className="flex-1" />
				</div>

				{/* ── Trending grid ──────────────────────────────────── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className="relative overflow-hidden rounded-md">
							<div className="relative aspect-video">
								<Skeleton className="absolute inset-0 size-full rounded-none" />

								<div className="absolute bottom-0 left-0 p-5 pb-0 w-full flex flex-col gap-2">
									<Skeleton className="h-3 w-20" />
									<Skeleton className="h-6 w-2/3" />
								</div>
							</div>

							{/* top row: rating + bookmark */}
							<div className="absolute top-0 left-0 w-full flex gap-3 justify-between items-center p-3">
								<Skeleton className="h-6 w-14 rounded-2xl" />
								<Skeleton className="size-8 rounded-full" />
							</div>

							{/* bottom meta row */}
							<div className="p-5 w-full flex justify-between">
								<Skeleton className="h-3 w-14" />
								<Skeleton className="h-3 w-8" />
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
