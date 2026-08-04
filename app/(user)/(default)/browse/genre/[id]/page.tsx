import GenrePage from "../../components/genre-page";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	// const queryClient = new QueryClient({
	// 	defaultOptions: {
	// 		queries: {
	// 			staleTime: 1000 * 60 * 5,
	// 		},
	// 	},
	// });
	// const supabase = await createClient();
	// await queryClient.prefetchQuery({
	// 	queryKey: ["movie", id],
	// 	queryFn: () => getMovieDetails(supabase, id),
	// });

	return <GenrePage genreId={id} />;
}
