"use client";
import BasicHeader from "@/components/basic-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { genreList } from "@/lib/utils/format-genre";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRowNoMovieCredits } from "@/types/movie";
import { GoogleGenAI } from "@google/genai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dot, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { appToast } from "@/components/app-toast";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

interface AIRecommendation {
	id: string;
	reason: string;
}

const formatPrompt = (prompt: string, genres: number[], movieList: string) => {
	let genre = "No Reference";
	if (genres.length > 0) {
		genre = genres
			.map((item) => {
				const findGenre = genreList.find((g) => g.id === item);
				return findGenre?.name;
			})
			.join(", ");
	}
	return `
You are a movie recommender. Only recommend movies from this list, using their exact ID. Never invent titles.

User Mood: ${genre}
User Request: ${prompt}

Movies: 
${movieList}

Respond ONLY with valid JSON in this format with 5 recommendation, and make sure the id of the movie is complete:
[{"id": acb5ac6c-c05c-45a7-9838-67d96579c723, "reason": "short explanation"}]
    `;
};

const Page = ({}) => {
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const [prompt, setPrompt] = useState<string>("");
	const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
	const [selectedModel, setSelectedModel] = useState<string>("gemini-3.6-flash");

	const { data, isError } = useQuery({
		queryKey: ["movie-recommendation", selectedGenres],
		queryFn: async () => {
			const supabase = await createClient();

			const { data, error } = await supabase.rpc("movies_by_genre", {
				genre_ids: selectedGenres.length > 0 ? selectedGenres : null,
			});

			if (error) throw error;

			return data;
		},
	});
	let filter = "No Movies";
	if (data) {
		filter = data
			?.map(
				(
					item: Omit<MovieDetailsRowNoMovieCredits, "genres"> & {
						genres: { id: number; name: string }[];
					},
				) => {
					const genres = item?.genres
						?.map((g) => g.name)
						.filter(Boolean)
						.join(", ");
					return `${item.id} - ${item.title} | ${genres} | ${item.release_date}`;
				},
			)
			.join("\n");
	}

	const { mutate: mutationPrompt, isPending } = useMutation({
		mutationKey: ["ai-movie-recommendation"],
		mutationFn: async () => {
			const response = await ai.models.generateContent({
				model: selectedModel,
				contents: formatPrompt(prompt, selectedGenres, filter),
				config: {
					responseMimeType: "application/json",
					responseSchema: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: { type: "string" },
								reason: { type: "string" },
							},
							required: ["id", "reason"],
						},
					},
				},
			});
			return response.text;
		},
		onSuccess: (text) => {
			if (!text) return;
			try {
				const parsed: AIRecommendation[] = JSON.parse(text);
				setRecommendations(parsed);
			} catch (err) {
				appToast.error("Something went wrong, try again later!");
				console.log(err);
			}
		},
	});

	const recommendedIds = recommendations.map((r) => r.id);
	const { data: recommendedMovies, isLoading: isLoadingRecommendedMovies } = useQuery({
		queryKey: ["ai-recommended-movies", recommendedIds],
		queryFn: async () => {
			const supabase = await createClient();

			const { data, error } = await supabase
				.from("movies")
				.select(
					`
                        *,
                        movie_genres(
                            genre_id,
                            genres(id, tmdb_genre_name)
                        )
                    `,
				)
				.in("id", recommendedIds);

			if (error) throw error;
			return data;
		},
		enabled: recommendedIds.length > 0,
	});
	const moviesWithReasons = recommendations
		.map((rec) => {
			const movie = recommendedMovies?.find((m) => m.id === rec.id);
			if (!movie) return null;
			return { ...movie, reason: rec.reason };
		})
		.filter((item): item is NonNullable<typeof item> => item !== null);

	return (
		<div className="section-container relative z-10 flex flex-col gap-y-4 pt-20 pb-10">
			<BasicHeader
				sticker="AI Movie Agent"
				title="Stuck on What to Watch?"
				description="Set the mood, describe the night you're having, and we'll hand you five picks pulled from the library — each one with the reasoning behind it, so you're not just trusting a shrug."
			/>
			<div className="max-w-200 mx-auto w-full rounded-md">
				<CardContent className="p-0 xl:p-8 flex flex-col">
					<Select value={selectedModel} onValueChange={setSelectedModel}>
						<SelectGroup className="mb-5">
							<SelectLabel>AI Model</SelectLabel>
							<SelectTrigger className="w-50">
								<SelectValue placeholder="AI Model" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="gemini-3.6-flash">Gemini 3.6 Flash</SelectItem>
								<SelectItem value="gemini-3.5-flash">Gemini 3.5 Flash</SelectItem>
								<SelectItem value="gemini-3.5-flash-lite">
									Gemini 3.5 Flash Lite
								</SelectItem>
							</SelectContent>
						</SelectGroup>
					</Select>
					<p className="px-2 py-1.5 text-xs text-muted-foreground">
						Pick a mood (Optional)
					</p>
					<div className="flex flex-wrap gap-2 mb-5 ">
						{genreList.map((genre) => {
							return (
								<Badge
									key={genre.id}
									data-active={selectedGenres.includes(genre.id)}
									className="data-[active=true]:bg-accent cursor-pointer p-2 px-4 rounded-2xl hover:bg-accent/70 hover:text-muted-foreground text-muted-foreground/50 data-[active=true]:text-foreground"
									variant={"outline"}
									onClick={() => {
										setSelectedGenres((prev) => {
											if (prev.includes(genre.id)) {
												return prev.filter((item) => item !== genre.id);
											}
											return [...prev, genre.id];
										});
									}}
								>
									<Dot className="size-3 scale-300 mr-1" />
									{genre.name}
								</Badge>
							);
						})}
					</div>
					<p className="px-2 py-1.5 text-xs text-muted-foreground">
						Describe the movie you're looking for
					</p>
					<Textarea
						id="describe-movie"
						placeholder="e.g. I want something slow-paced I can half-watch while...."
						className="h-32 placeholder:text-muted-foreground/60"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
					/>
					<span className="text-xs text-muted-foreground mt-2">
						A sentence or two is plenty — the more specific you are, the sharper the
						five picks.
					</span>
					<Button
						className="mt-10"
						disabled={isPending}
						onClick={() => {
							mutationPrompt();
						}}
					>
						<Sparkles /> Show me 5 picks
					</Button>
				</CardContent>
			</div>

			{isPending || isLoadingRecommendedMovies ? (
				<p className="text-center text-muted-foreground">Finding your picks...</p>
			) : null}

			{moviesWithReasons.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-auto w-full">
					<div className="col-span-2 md:col-span-3 lg:col-span-5  flex gap-4 items-center pt-5 pb-0">
						<p className="section-title text-nowrap">AI Recommendations</p>
						<Separator className="flex-1" />
					</div>
					{moviesWithReasons.map((movie) => {
						const poster = formatImagePath(movie.poster_path);
						return (
							<Link
								href={`/browse/${movie.id}`}
								key={movie.id}
								className="overflow-hidden group translate-y-0 hover:-translate-y-1.5 rounded-md hover:shadow-lg shadow-primary transition-all"
							>
								<div className="relative aspect-2/3 w-full ">
									<Image
										className="object-cover rounded-md"
										src={poster}
										alt={movie.title}
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										loading="lazy"
									/>
									<div className="absolute bottom-0 left-0 p-4 pb-0 z-10">
										<p className="font-semibold">{movie.title}</p>
									</div>
									<div className="bg-linear-to-t from-background to-transparent absolute bottom-0 left-0 w-full h-full" />
								</div>
								<div className="p-4 pt-0 flex flex-col">
									<p className="text-xs text-muted-foreground/80 font-jetbrains-mono mt-4 mb-2">
										{movie.movie_genres
											?.map((mg: any) => mg.genres?.tmdb_genre_name)
											.filter(Boolean)
											.join(", ")}
									</p>
									<p className="text-sm text-muted-foreground ">
										<span className="font-semibold">AI Insight:</span>{" "}
										{movie.reason}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Page;
