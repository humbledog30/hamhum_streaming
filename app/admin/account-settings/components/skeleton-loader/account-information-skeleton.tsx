import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const AccountInformationSkeleton = () => {
	return (
		<div className="mt-5 flex flex-col gap-5">
			{/* Avatar */}
			<div className="flex items-end gap-4">
				<Skeleton className="size-20 rounded-full" />

				<div className="flex flex-col items-start gap-2">
					<Button variant="outline" disabled>
						Upload photo
					</Button>

					<div className="space-y-1">
						<Skeleton className="h-3 w-44" />
						<Skeleton className="h-3 w-32" />
					</div>
				</div>
			</div>

			{/* Form */}
			<div className="flex flex-col items-start gap-5">
				<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
					{/* Full Name */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-10 w-full rounded-md" />
					</div>

					{/* Email */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
				</div>

				<Skeleton className="h-10 w-32 rounded-md" />
			</div>
		</div>
	);
};

export default AccountInformationSkeleton;
