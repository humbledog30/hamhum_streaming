"use client";
import BannerOverlay from "@/components/banner-overlay";
import { Button } from "@/components/ui/button";
import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath";
import { useFormatRuntime } from "@/lib/hooks/useFormatRuntime";
import { Genre, MovieDetails } from "@/types/movie";
import { Dot, Play, Plus, Share, Share2, Star } from "lucide-react";
import { movieDetails, creditsResponse, releaseResponse } from "./data/sample-data";
import React from "react";
import { CastMember, CrewMember } from "@/types/cast";
import { cn } from "@/lib/utils";
import { ExpandableWrapper } from "@/components/ExpandableSection";

const InfoPage = () => {
	const cast = creditsResponse.cast.filter((cast) => cast.known_for_department === "Acting");
	const director = creditsResponse.crew.filter((crew) => crew.job === "Director");
	const writer = creditsResponse.crew.filter((crew) => crew.job === "Story");
	const rating = releaseResponse
		.find((item) => item.iso_3166_1 === "US")
		?.release_dates.findLast((release) => release.certification !== "");
	const movieResponse = { rating: rating?.certification, ...movieDetails };
	const directorAndWriter = [...director, ...writer];
	console.log(directorAndWriter);
	return (
		<div className="w-full flex flex-col">
			{/* Info page Banner section */}
			<BannerSection details={movieResponse} />
			<div className="section-container flex flex-col gap-10">
				<div>
					<div className="flex items-center gap-5 mb-5">
						<h6 className="section-title text-nowrap flex items-center gap-3">
							Details
						</h6>
						<div className=" border-b border-foreground/80 w-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10">
						<div className="col-span-2 flex flex-col gap-3 justify-center">
							<Details data={cast} label="Cast" />
							<Details data={director} label="Director" />
							<Details data={writer} label="Writers" />
							<Details data={movieDetails.genres} label="Genres" />
						</div>
						<div className="col-span-1 flex flex-col gap-3 p-5 px-7 bg-chart-5/40 rounded-2xl">
							<OtherDetails
								data={
									<>
										<Star size={16} />
										{movieDetails.vote_average.toPrecision(2)}/10
									</>
								}
								label="Audience Score"
								className="text-yellow-400 "
							/>
							<OtherDetails
								data={movieDetails.release_date.split("-")[0]}
								label="Release Year"
							/>
							<OtherDetails
								data={useFormatRuntime(movieDetails.runtime)}
								label="Runtime"
							/>
							<OtherDetails data={rating?.certification} label="Rating" />
						</div>
					</div>
				</div>
				<div>
					<div className="flex items-center gap-5 mb-5">
						<h6 className="section-title text-nowrap flex items-center gap-3">
							Cast & Crew
						</h6>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10 ">
						<div className="col-span-2">
							<ExpandableWrapper>
								<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
									{cast.map((item, index) => {
										const castProfile = useFormatImagePath(item?.profile_path);
										return (
											<div
												key={`cast-profile-${index}`}
												className="shrink-0 text-center  "
											>
												<img
													className="w-full aspect-square rounded-full object-cover mx-auto mb-2 opacity-80 border-2 border-primary"
													src={castProfile}
													alt={item.name}
												/>

												<p className="font-semibold text-base">
													{item?.name}
												</p>
												<span className="text-foreground/50">
													{item?.character}
												</span>
											</div>
										);
									})}
									{directorAndWriter.map((item, index) => {
										const castProfile = useFormatImagePath(item?.profile_path);
										return (
											<div
												key={`cast-profile-${index}`}
												className="shrink-0 text-center "
											>
												<img
													className="w-full aspect-square rounded-full object-cover mx-auto mb-2 opacity-80 border-2 border-primary"
													src={castProfile}
													alt={item.name}
												/>
												<p className="font-semibold text-base">
													{item?.name}
												</p>
												<span className="text-foreground/50">
													{item?.department}
												</span>
											</div>
										);
									})}
								</div>
							</ExpandableWrapper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Details = ({ data, label }: { data: (CastMember | CrewMember | Genre)[]; label: string }) => {
	return (
		<div className="flex flex-wrap pb-4 border-b">
			<span className="w-25 md:w-37.5 font-extralight text-sm text-foreground/40 uppercase ">
				{label}
			</span>
			<div className="flex-1 flex flex-wrap items-center gap-1">
				{data.map((dataItem, index) => {
					return (
						<React.Fragment key={`cast-${dataItem.id}`}>
							<span>{dataItem.name}</span>
							{index + 1 < data.length ? <Dot size={11} /> : null}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

const OtherDetails = ({
	data,
	label,
	className,
}: {
	data: React.ReactNode;
	label: string;
	className?: string;
}) => {
	return (
		<div className="flex justify-between items-center gap-3 border-b border-foreground/10 pb-3">
			<span className="text-foreground/50 text-sm font-light">{label}</span>
			<span
				className={cn(
					"text-lg font-medium flex items-center gap-1 font-[Georgia]",
					className,
				)}
			>
				{data}
			</span>
		</div>
	);
};

type MovieDetailsWithRating = Omit<MovieDetails, "rating"> & {
	rating: string | undefined;
};
const BannerSection = ({ details }: { details: MovieDetailsWithRating }) => {
	return (
		<div className="w-full h-fit md:h-[calc(100dvh-4rem)] min-h-150 relative overflow-hidden">
			<div className="w-full h-full relative">
				<img
					className="w-full h-full object-cover absolute z-0"
					src={`${useFormatImagePath(details?.backdrop_path)}`}
					alt={`${details.title} Backdrop`}
				/>
				<BannerOverlay />
				<div className="section-container h-full z-20 relative flex item items-end gap-5 md:gap-8 flex-wrap py-20">
					<img
						className="aspect-2/3 h-50 sm:h-70 md:h-80 lg:h-90 object-cover border rounded-xl border-primary"
						src={`${useFormatImagePath(details?.poster_path)}`}
						alt={details.title}
					/>
					<div className="flex-1 flex-col flex gap-3">
						<h1 className="text-5xl md:text-6xl uppercase font-fraunces font-semibold">
							{details.title}
						</h1>
						<div className="flex gap-3 text-xs text-foreground/80 items-center">
							<span className="border bg-background/30 p-0.5 border-foreground/80 px-3 rounded-md font-semibold font-inter">
								{details.rating}
							</span>
							<span>{details.release_date.split("-")[0]}</span>
							{details?.runtime ? (
								<span>{useFormatRuntime(details.runtime)}</span>
							) : null}
							<span className="flex gap-1 items-center font-medium text-primary dark:text-yellow-400">
								<Star size={14} />
								{details.vote_average.toPrecision(2)}
							</span>
						</div>
						<div className="flex gap-1">
							{details.genres.map((genre, index) => {
								return (
									<span
										className="text-xs border bg-background/30 p-0.5 border-foreground/80 px-3 rounded-2xl opacity-70 font-light"
										key={`genre-${genre.id}`}
									>
										{genre.name}
									</span>
								);
							})}
						</div>
						<p className="max-w-full md:max-w-200">{details.overview}</p>
						<div className="flex gap-2 items-center mt-5 flex-wrap">
							<Button
								className=" px-6 rounded-3xl h-11 primary-btn"
								variant={"default"}
							>
								<Play /> Watch Now
							</Button>
							<Button
								className=" px-6 bg-background/40 rounded-3xl h-11"
								variant={"outline"}
							>
								<Plus /> Add to list
							</Button>
							<Button
								className="bg-background/40 rounded-full size-11"
								size={"icon"}
								variant={"outline"}
							>
								<Share2 />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoPage;
