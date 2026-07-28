import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getMovieDetails } from "@/lib/services/movie.services";
import { createClient } from "@/lib/supabase/server";
import BrowseInfoContent from "../components/browse-info-content";
import { Suspense } from "react";
import MovieInfoPageSkeleton from "../components/skeleton-loader/movie-info-page-skeleton";
import type { Metadata } from "next";
import { defaultUrl } from "@/lib/utils";
import { formatImagePath } from "@/lib/utils/format-image-path";

interface PageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const supabase = await createClient();
	const movie = await getMovieDetails(supabase, id);

	if (!movie) {
		return {
			title: "Ham+Hum | Movie not found",
		};
	}

	return {
		title: `Ham+Hum | ${movie.title}`,
		metadataBase: new URL(`${defaultUrl}/${id}`),
		description: movie.overview ?? "Watch this movie on Ham+Hum.",
		openGraph: {
			title: movie.title,
			description: movie.overview ?? undefined,
			images: movie.backdrop_path ? formatImagePath(movie.backdrop_path) : undefined,
		},
		twitter: {
			title: movie.title,
			description: movie.overview ?? undefined,
			images: movie.backdrop_path ? formatImagePath(movie.backdrop_path) : undefined,
		},
	};
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
			},
		},
	});
	const supabase = await createClient();
	await queryClient.prefetchQuery({
		queryKey: ["movie", id],
		queryFn: () => getMovieDetails(supabase, id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<MovieInfoPageSkeleton />}>
				<BrowseInfoContent movieId={id} />
			</Suspense>
		</HydrationBoundary>
	);
}
