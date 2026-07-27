import { Skeleton } from "@/components/ui/skeleton";

const ProfileGenreSkeleton = () => {
	return (
		<div className="flex flex-col gap-5">
			<div className="mt-5 flex max-w-200 flex-wrap gap-3">
				{Array.from({ length: 18 }).map((_, index) => (
					<Skeleton
						key={index}
						className="h-10 rounded-md"
						style={{
							width: `${80 + (index % 4) * 20}px`,
						}}
					/>
				))}
			</div>

			<Skeleton className="h-10 w-40 rounded-md" />
		</div>
	);
};

export default ProfileGenreSkeleton;
