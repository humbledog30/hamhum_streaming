export interface BrowseGenre {
	id: number;
	genre_id: number;
	movies: {
		id: number;
		poster_path: string;
		release_date: string | null;
		title: string;
		tmdb_id: number;
		runtime: number | null;
	}[];
	tmdb_genre_name: string;
}
