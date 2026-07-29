export interface BrowseGenre {
	id: number;
	genre_id: number;
	movies: BrowseGenreMovies[];
	tmdb_genre_name: string;
}

export interface BrowseGenreMovies {
	id: number;
	poster_path: string;
	release_date: string | null;
	title: string;
	tmdb_id: number;
	runtime: number | null;
	vote_average: number | 0;
}
