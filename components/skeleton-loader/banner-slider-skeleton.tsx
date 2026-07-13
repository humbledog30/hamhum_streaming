import { NextPage } from "next";
import { Skeleton } from "../ui/skeleton";

interface Props {}

const BannerSliderSkeleton = ({}) => {
	return (
		<div className="w-full h-full relative">
			<Skeleton className="w-full h-full absolute z-0 rounded-none" />
			<div className="section-container h-full z-20 relative flex flex-col justify-end pb-10">
				<div className="py-5 border-b border-muted-foreground">
					<Skeleton className="h-5 w-24 mb-4" />

					<div className="meta-information flex-wrap flex gap-3 mb-4 items-center">
						<div className="flex gap-3 border-r border-transparent sm:border-muted-foreground pr-3">
							<Skeleton className="h-6 w-12 rounded-md" />
							<Skeleton className="h-5 w-10" />
							<Skeleton className="h-5 w-14" />
							<Skeleton className="h-5 w-12" />
						</div>
						<div className="flex gap-3">
							<Skeleton className="h-5 w-16" />
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-5 w-14" />
						</div>
					</div>

					<Skeleton className="h-9 w-2/3 max-w-md" />
				</div>

				<div className="flex justify-between flex-wrap items-end gap-5 py-5">
					<div className="max-w-full md:max-w-[75%] w-full space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>

					<div className="action-buttons flex gap-3 flex-wrap">
						<Skeleton className="h-11 w-36 rounded-md" />
						<Skeleton className="h-11 w-36 rounded-md" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerSliderSkeleton;
