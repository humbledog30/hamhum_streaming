import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function AllTimeSkeleton() {
	return (
		<div>
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

			<AllTimeGreatContentSkeleton />
		</div>
	);
}

export default function AllTimeGreatContentSkeleton() {
	return (
		<section className="mx-auto section-container py-8 flex flex-col gap-10">
			{/* Top 3 */}
			<div className="flex gap-3 items-center">
				<Skeleton className="h-6 w-56" />
				<Separator className="flex-1" />
			</div>

			<div className="flex flex-col gap-5">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center relative"
					>
						{/* Rank */}
						<Skeleton className="absolute lg:static top-3 left-3 h-12 w-12 lg:h-16 lg:w-16 rounded-md" />

						{/* Image */}
						<Skeleton className="w-full lg:w-80 aspect-video rounded-md shrink-0" />

						{/* Content */}
						<div className="flex-1 flex flex-col gap-3">
							<div className="flex gap-2 flex-wrap">
								<Skeleton className="h-4 w-14" />
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-16" />
							</div>

							<Skeleton className="h-9 w-3/4" />

							<div className="flex gap-3">
								<Skeleton className="h-4 w-12" />
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-10" />
							</div>
						</div>

						{/* Right */}
						<div className="absolute lg:static top-3 right-3 flex lg:flex-col items-end gap-3">
							<Skeleton className="h-4 w-12" />
							<Skeleton className="h-4 w-14" />
							<Skeleton className="size-8 rounded-full" />
						</div>
					</div>
				))}
			</div>

			{/* Remaining */}
			<div className="flex gap-3 items-center">
				<Skeleton className="h-6 w-64" />
				<Separator className="flex-1" />
			</div>

			<div className="flex flex-col gap-5">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center relative"
					>
						{/* Rank */}
						<Skeleton className="absolute lg:static top-3 left-3 h-8 w-8 rounded-md" />

						{/* Image */}
						<Skeleton className="w-full lg:w-40 aspect-video rounded-md shrink-0" />

						{/* Content */}
						<div className="flex-1 flex flex-col gap-2">
							<Skeleton className="h-8 w-2/3" />

							<div className="flex gap-2 flex-wrap">
								<Skeleton className="h-4 w-10" />
								<Skeleton className="h-4 w-14" />
								<Skeleton className="h-4 w-12" />
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-20" />
							</div>
						</div>

						{/* Right */}
						<div className="absolute lg:static top-3 right-3 flex items-center gap-3">
							<Skeleton className="h-4 w-12" />
							<Skeleton className="h-4 w-14" />
							<Skeleton className="size-8 rounded-full" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
