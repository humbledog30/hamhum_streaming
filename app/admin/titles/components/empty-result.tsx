import { SearchX } from "lucide-react";

const EmptyResult = ({ search }: { search: string }) => {
	return (
		<div className="col-span-6 border-dashed border rounded-md p-5 flex justify-center items-center flex-col gap-3 min-h-70">
			<div className="bg-destructive p-3 rounded-full">
				<SearchX />
			</div>
			<p className="text-lg font-semibold">No matches on TMDB</p>
			<p className="text-muted-foreground">
				We couldn&apos;t find anything for &quot;<span className="text-foreground">{search}</span>&quot;.
				Try:
			</p>
			<ul className="max-w-100 text-muted-foreground text-sm list-disc">
				<li>Checking the spelling</li>
				<li>Searching the original (non-translated) title</li>
				<li>Removing the release year or subtitle</li>
			</ul>
		</div>
	);
};

export default EmptyResult;
