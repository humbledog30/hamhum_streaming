"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Flame, MoveRightIcon, Search, TrendingUp, X } from "lucide-react";
import { Input } from "@base-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

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

const SearchPopover = ({}) => {
	const [search, setSearch] = useState("");
	const router = useRouter();
	return (
		<Dialog>
			<DialogOverlay className="backdrop-blur-xs" />
			<DialogTrigger className="rounded-full cursor-pointer p-2 h-8 gap-1.5 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
				<Search size={15} />
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-xl px-0 top-35 shadow-2xl shadow-primary/50 rounded-2xl"
				showCloseButton={false}
			>
				<DialogHeader className="flex-row items-center gap-3 px-6 pb-2">
					<Search className="text-muted-foreground" size={15} />
					<Input
						className="flex-1 focus:outline-0"
						placeholder="Search titles, original titles, overview"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						className="rounded-2xl px-4! cursor-pointer"
						disabled={search === ""}
						onClick={() => router.push(`search?q=${encodeURIComponent(search)}`)}
					>
						Search <MoveRightIcon />
					</Button>
					<span className="text-xs text-muted-foreground/70 border border-muted-foreground/50 px-1.5 py-0.5 rounded-md">
						esc
					</span>

					<DialogClose className="rounded-full h-8 w-8 border flex items-center text-muted-foreground/70 hover:text-foreground hover:border-foreground/60 transition-all cursor-pointer justify-center p-0">
						<X size={14} />
					</DialogClose>
				</DialogHeader>
				<Separator className="" />
				<div className="px-6 pt-3">
					<p className="text-xs uppercase tracking-widest text-muted-foreground flex gap-3">
						Trending Searches <TrendingUp size={14} />
					</p>
					<div className="flex flex-wrap gap-2 mt-5">
						{trendingSearch?.map((item, index) => {
							return (
								<DialogClose asChild key={item}>
									<Badge
										className="py-1.5 px-4 rounded-2xl font-normal bg-accent/30 hover:border-primary hover:bg-accent/60 cursor-pointer"
										key={item}
										variant={"outline"}
										onClick={() => {
											router.push(`/search?q=${encodeURIComponent(item)}`);
										}}
									>
										{index === 0 ? (
											<Flame size={13} className="mr-2 text-orange-400" />
										) : null}
										{item}
									</Badge>
								</DialogClose>
							);
						})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SearchPopover;
