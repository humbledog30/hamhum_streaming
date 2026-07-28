import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function UpcomingContentSkeleton({ count = 5 }: { count?: number }) {
	return (
		<div className="section-container">
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="grid rid-cols-1 md:grid-cols-[100px_1fr]">
					{/* date + rail, matches the real month/day + connecting line */}
					<div className="hidden md:flex justify-end pr-10 gap-5">
						<div className="flex flex-col items-center mt-5 gap-1.5">
							<Skeleton className="h-3 w-8" />
							<Skeleton className="h-7 w-9" />
						</div>
						<div className="w-px h-full bg-muted-foreground/20 relative">
							<Skeleton className="size-3 rounded-full absolute left-1/2 top-10 -translate-x-1/2" />
						</div>
					</div>

					{/* backdrop card */}
					<div
						className={cn(
							"flex flex-col sm:flex-row min-h-90 relative overflow-hidden rounded-md",
							index !== count - 1 && "mb-5",
						)}
					>
						<Skeleton className="absolute inset-0 size-full rounded-none" />

						<div className="relative z-20 p-10 pt-30 flex justify-end items-baseline flex-col w-full gap-3">
							<Skeleton className="h-3 w-44" />
							<Skeleton className="h-9 w-3/4 max-w-100" />

							<div className="flex flex-col gap-2 w-full max-w-130 mt-5">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-11/12" />
								<Skeleton className="h-4 w-2/3" />
							</div>

							<div className="flex items-center gap-2 mt-7 mb-1">
								<Skeleton className="h-9 w-24" />
								<Skeleton className="size-9" />
								<Skeleton className="size-9" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default function UpcomingReleasesLoading() {
	return (
		<div>
			{/* ── Hero ───────────────────────────────────────────── */}
			<section className="relative w-full">
				<div className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10">
					<span className="flex items-center gap-3">
						<Skeleton className="size-4 rotate-45" />
						<Skeleton className="h-4 w-32" />
					</span>

					<Skeleton className="h-16 w-full max-w-120" />

					<div className="mt-4 flex max-w-150 flex-col gap-2">
						<Skeleton className="h-5 w-full" />
						<Skeleton className="h-5 w-4/5" />
					</div>
				</div>
			</section>

			<section className="px-5 py-8 flex flex-col gap-10">
				{/* ── "This Year's Lineup" label ─────────────────────── */}
				<div className="section-container flex gap-5 items-center">
					<Skeleton className="h-5 w-40" />
					<Separator className="flex-1" />
					<Skeleton className="h-7 w-16 rounded-2xl" />
				</div>

				<UpcomingContentSkeleton />
			</section>
		</div>
	);
}
