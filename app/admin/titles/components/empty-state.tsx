import { Search } from "lucide-react";

const EmptyState = () => {
	return (
		<div className="col-span-6 border-dashed border rounded-md p-5 flex justify-center items-center flex-col gap-3 min-h-70">
			<div className="bg-primary p-3 rounded-full">
				<Search />
			</div>
			<p>Search TMDB to get started</p>
			<p className="max-w-100 text-center text-muted-foreground text-sm">
				Type a movie title above and we'll pull matching posters, ratings, and details
				straight from TMDB.
			</p>
		</div>
	);
};

export default EmptyState;
