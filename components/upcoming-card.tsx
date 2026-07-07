"use client";
import { useReleaseStatus } from "@/lib/hooks/useReleaseStatus";
import { NextPage } from "next";
import { Button } from "./ui/button";
import { Bell, Plus } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";

const UpcomingCard = ({ items }: { items: Movie[] }) => {
	if (!items) {
		return null;
	}
	return items.map((item: Movie) => {
		const formatted = new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(new Date(item.release_date));

		const { status } = useReleaseStatus(item.release_date);
		return (
			<div
				key={`upcoming-card-${item.id}`}
				className="group hover:-translate-y-2 transition duration-300 hover:cursor-pointer"
			>
				<div className="relative border rounded-xl overflow-hidden mb-3">
					<div className="absolute top-0 left-0 rounded-br-xl opacity-100 group-hover:opacity-0 group-hover:-translate-y-1 transition duration-300 flex flex-col items-center p-2 px-4 bg-background/90">
						<span className="text-2xl font-fraunces">14</span>
						<span className="text-[10px] text-primary font-jetbrains-mono">Jul</span>
					</div>
					<div className="flex flex-col justify-end p-4 items-start gap-3 absolute h-full w-full left-0 top-0 z-10 translate-y-2 group-hover:translate-y-0 bg-linear-to-t from-background from-30% to-primary/20 opacity-0 group-hover:opacity-100 transition duration-300">
						<div className="flex flex-wrap text-[10px] gap-1 items-center uppercase text-muted-foreground">
							{item.genre_ids.map((genre, genreIndex) => {
								const { label } = useGenresLabel(genre);
								return (
									<div
										className="gap-1 flex"
										key={`upcoming-genre-${genreIndex}`}
									>
										<span>{label}</span>
										<span>
											{genreIndex + 1 < item.genre_ids.length ? "•" : null}
										</span>
									</div>
								);
							})}
						</div>
						<Suspense>
							{status ? (
								<div
									suppressHydrationWarning
									className="rounded-2xl text-xs bg-primary/20 p-0.5 px-3 border-primary border text-primary font-inter"
								>
									<span className="font-light">{status}</span>
								</div>
							) : null}
						</Suspense>
						<p className="text-xs line-clamp-4 opacity-80 font-inter">
							{item.overview}
						</p>
						<div className="flex gap-2">
							<Button className="rounded-2xl">
								<Bell /> Remind Me
							</Button>
							<Button className="rounded-full aspect-square p-2.5" variant="outline">
								<Plus />
							</Button>
						</div>
					</div>
					<img src={`${useFormatImagePath(item.poster_path)}`} alt={item.title} />
				</div>
				<h6 className="font-fraunces text-lg font-semibold">{item.title}</h6>
				<p className="text-xs font-thin font-jetbrains-mono">Releases {formatted}</p>
			</div>
		);
	});
};

export default UpcomingCard;
