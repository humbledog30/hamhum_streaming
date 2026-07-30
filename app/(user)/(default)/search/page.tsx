import { redirect } from "next/navigation";
import SearchBox from "./components/search-box";
import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { defaultUrl } from "@/lib/utils";
import SearchResults from "./components/search-results";
import AlgoliaBranding from "@/components/algolia-branding";

type SearchParams = Promise<{ [q: string]: string | undefined }>;

const trendingSearch = [
	"Avatar aang",
	"Swapped",
	"Hoppers",
	"Barbie",
	"Demon Slayer",
	"One Piece",
	"Moana",
	"Elemental",
	"Wild Robot",
];

export const metadata: Metadata = {
	title: "Ham+Hum | Search",
	metadataBase: new URL(`${defaultUrl}/search`),
	description:
		"Search for movies and uncover timeless classics, hidden gems, and the latest releases.",
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
	const resolvedParams = await searchParams;
	const q = resolvedParams.q ?? "";
	if (!q) redirect("/");

	return (
		<div className="w-full flex flex-col">
			<div className="section-container py-5 flex flex-col gap-3">
				<div className="mt-10 mb-5 text-center">
					<h1 className="font-fraunces text-3xl">Search & Watch</h1>
					<p className="text-muted-foreground text-sm">
						Every search leads to a new story.
					</p>
				</div>
				<div className="mx-auto max-w-150 w-full flex flex-col items-center gap-3">
					<SearchBox />
					<AlgoliaBranding />
				</div>

				<div className="flex flex-col mt-5 mb-5">
					<p className="text-xs uppercase tracking-widest text-muted-foreground flex gap-3">
						Trending Searches <TrendingUp size={14} />
					</p>
					<div className="flex flex-wrap gap-2 mt-5">
						{trendingSearch.map((item, index) => (
							<Link key={item} href={`/search?q=${encodeURIComponent(item)}`}>
								<Badge
									className="py-1.5 px-4 rounded-2xl font-normal bg-accent/30 hover:border-primary hover:bg-accent/60 cursor-pointer"
									variant="outline"
								>
									{index === 0 ? (
										<Flame size={13} className="mr-2 text-orange-400" />
									) : null}
									{item}
								</Badge>
							</Link>
						))}
					</div>
				</div>

				<SearchResults query={q} />
			</div>
		</div>
	);
}
