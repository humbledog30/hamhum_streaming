import { Search } from "lucide-react";
import { NextPage } from "next";

const SearchNoResult = ({ search }: { search: string }) => {
	return (
		<div className="flex flex-col gap-3 items-center justify-center py-10 max-w-100 mx-auto">
			<div className="p-5 rounded-full bg-accent flex justify-center items-center relative w-fit mb-3">
				<Search className=" text-background dark:text-foreground" size={25} />
			</div>
			<p className="text-lg lg:text-xl font-fraunces font-semibold">
				No result for <span>"{search}"</span>
			</p>
			<p className="text-muted-foreground text-center text-sm">
				We couldn't find a close enough match, and couldn't find anything for that search.
				Try checking the spelling, or explore a genre instead.
			</p>
		</div>
	);
};

export default SearchNoResult;
