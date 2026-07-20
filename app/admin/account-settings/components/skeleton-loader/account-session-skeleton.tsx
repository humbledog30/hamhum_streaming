import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AccountSessionSkeleton = ({ count = 4 }: { count?: number }) => {
	return (
		<div className="flex flex-col gap-3">
			{Array.from({ length: count }).map((_, index) => (
				<React.Fragment key={index}>
					<div className="grid grid-cols-[auto_1fr] gap-2 w-full items-center">
						<Skeleton className="h-10 w-10 rounded-md self-baseline mt-1" />

						<div className="pr-5 space-y-2">
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-3 w-full max-w-md" />
							<Skeleton className="h-3 w-3/4 max-w-sm" />
							<Skeleton className="h-3 w-24 mt-3" />
						</div>
					</div>

					{index < count - 1 && <Separator />}
				</React.Fragment>
			))}
		</div>
	);
};

export default AccountSessionSkeleton;
