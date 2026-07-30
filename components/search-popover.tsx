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
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRow } from "@/types/movie";
import { MovieHit, useMovieSearch } from "@/lib/hooks/use-movie-search";
import AlgoliaBranding from "./algolia-branding";
import Image from "next/image";

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
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { hits, loading } = useMovieSearch(search);

	const handleSearch = () => {
		if (!search) return;
		router.push(`/search?q=${encodeURIComponent(search)}`);
		setOpen(false);
	};

	const handleSelect = (id: string | number) => {
		router.push(`/browse/${id}`);
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				setOpen(next);
				if (!next) setSearch(""); // reset on close
			}}
		>
			<DialogOverlay className="backdrop-blur-xs" />
			<DialogTrigger className="rounded-full cursor-pointer p-2 h-8 gap-1.5 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
				<Search size={15} />
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-xl px-0 pb-4 top-10 shadow-2xl translate-y-0! shadow-primary/50 rounded-2xl"
				showCloseButton={false}
			>
				<DialogHeader className="flex-row items-center gap-3 px-6 pb-2">
					<Search className="text-muted-foreground" size={15} />
					<Input
						className="flex-1 focus:outline-0 w-30"
						placeholder="Search titles, original titles, overview"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						autoFocus
					/>
					<Button
						className="hidden md:flex rounded-2xl px-4! cursor-pointer"
						disabled={search === ""}
						onClick={handleSearch}
					>
						Search <MoveRightIcon />
					</Button>
					<Button
						className="block md:hidden rounded-2xl px-4! cursor-pointer"
						disabled={search === ""}
						onClick={handleSearch}
					>
						<Search />
					</Button>
					<span className="hidden md:block text-xs text-muted-foreground/70 border border-muted-foreground/50 px-1.5 py-0.5 rounded-md">
						esc
					</span>
					<DialogClose className="rounded-full hidden md:flex h-8 w-8 border items-center text-muted-foreground/70 hover:text-foreground hover:border-foreground/60 transition-all cursor-pointer justify-center p-0">
						<X size={14} />
					</DialogClose>
				</DialogHeader>
				<Separator />

				<div className="px-6 pt-3">
					<p className="text-xs uppercase tracking-widest text-muted-foreground flex gap-3">
						Trending Searches <TrendingUp size={14} />
					</p>
					<div className="flex flex-wrap gap-2 mt-5">
						{trendingSearch.map((item, index) => (
							<DialogClose asChild key={item}>
								<Badge
									className="py-1.5 px-4 rounded-2xl font-normal bg-accent/30 hover:border-primary hover:bg-accent/60 cursor-pointer"
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
						))}
					</div>
				</div>

				<div className="px-2 pt-2 max-h-80 overflow-y-auto scrollbar-thin">
					{loading && hits.length === 0 ? (
						<p className="px-4 py-6 text-sm text-muted-foreground">Searching…</p>
					) : null}

					{!loading && hits.length === 0 && search !== "" ? (
						<p className="px-4 py-6 text-sm text-muted-foreground">
							No results for “{search}”
						</p>
					) : null}

					{hits.map((item: MovieHit) => (
						<Button
							key={item.objectID}
							onClick={() => handleSelect(item.id)}
							className="w-full flex bg-transparent h-auto items-center gap-3 rounded-lg px-4 py-2 text-left hover:bg-accent/60 transition-colors"
						>
							<Image
								src={formatImagePath(
									typeof item.poster_path === "string" ? item.poster_path : "",
								)}
								alt={item.title}
								width={65}
								height={40}
								className="rounded object-cover shrink-0"
								loading="lazy"
							/>
							<div className="min-w-0">
								<p
									className="text-sm font-medium truncate search-highlight"
									dangerouslySetInnerHTML={{
										__html: item._highlightResult?.title?.value ?? item.title,
									}}
								/>
								{item._snippetResult?.overview?.value && (
									<p
										className="text-xs text-muted-foreground text-wrap"
										dangerouslySetInnerHTML={{
											__html: item._snippetResult.overview.value,
										}}
									/>
								)}
							</div>
						</Button>
					))}
				</div>
				<Separator />
				<DialogFooter className="px-8">
					<AlgoliaBranding />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SearchPopover;
