import { Skeleton } from "@/components/ui/skeleton";

const ProfileFavoriteGenreSkeleton = ({}) => {
	return (
		<div className="flex flex-wrap gap-3 mt-4">
			{Array.from({ length: 6 }).map((_, index) => (
				<Skeleton key={index} className="h-8 w-24 rounded-2xl" />
			))}
		</div>
	);
};

export default ProfileFavoriteGenreSkeleton;
