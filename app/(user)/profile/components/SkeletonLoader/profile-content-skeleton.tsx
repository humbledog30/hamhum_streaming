import { Skeleton } from "@/components/ui/skeleton";

const ProfileContentSkeleton = ({}) => {
	return (
		<div className="flex items-center text-center flex-col gap-6">
			<Skeleton className="size-24 shrink-0 rounded-full" />
			<Skeleton className="h-10 w-48" />
			<Skeleton className="h-4 w-56" />
		</div>
	);
};

export default ProfileContentSkeleton;
