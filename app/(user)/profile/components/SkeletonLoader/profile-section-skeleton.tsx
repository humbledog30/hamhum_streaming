import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSectionSkeleton({ count = 3 }: { count?: number }) {
	return (
		<div className="flex flex-col gap-1">
			<Skeleton className="h-4 w-24" />
			<Skeleton className="h-6 w-48 mt-1" />
			<ul className="flex flex-col gap-4 mt-4">
				{Array.from({ length: count }).map((_, index) => (
					<li
						key={`provider-skeleton-${index}`}
						className="flex gap-3 items-center not-last:pb-4 not-last:border-b border-muted-foreground/10"
					>
						<Skeleton className="size-9 rounded-md shrink-0" />
						<Skeleton className="h-4 w-20" />
					</li>
				))}
			</ul>
		</div>
	);
}
