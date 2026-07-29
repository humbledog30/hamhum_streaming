import { CreditsResponse } from "./cast";

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	softcore: boolean;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MovieAdditionalProp extends Partial<Movie> {
	rating: string;
	runtime: string;
}

//tempo
export type MovieAdditionalPropRestructure = Omit<MovieAdditionalProp, "id"> & {
	id: string;
};
export interface MovieDetailsRow {
	id: number;
	tmdb_id: number;
	title: string;
	tagline: string | null;
	overview: string | null;
	release_date: string | null;
	poster_path: string | null;
	backdrop_path: string | null;
	runtime: number | null;
	certification: string | null;
	created_at: string;
	updated_at: string;
	original_language: string | null;
	original_title: string | null;
	popularity: number | null;
	status: string | null;
	tmdb_status: string | null;
	vote_average: number | null;
	vote_count: number | null;
	credits: CreditsResponse;
	release_dates: ReleaseDateResponse;
	genres: {
		genre: {
			id: number;
			tmdb_genre_name: string;
		} | null;
	}[];
	movie_credits: {
		role: string | null;
		job: string | null;
		person: {
			tmdb_person_id: number;
			name: string;
			profile_path: string | null;
		} | null;
	}[];
}

export interface MovieDetailsWithAppend extends MovieDetails {
	credits: CreditsResponse;
	release_dates: ReleaseDateResponse;
}
export interface MovieDetails {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: BelongsToCollection | null;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string | null;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number | null;
	softcore: boolean;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string | null;
	backdrop_path: string | null;
}

export type MovieDetailsRowNoMovieCredits = Omit<MovieDetailsRow, "movie_credits">;
