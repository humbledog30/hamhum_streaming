enum ReleaseDateType {
	Premiere = 1,
	TheatricalLimited = 2,
	Theatrical = 3,
	Digital = 4,
	Physical = 5,
	TV = 6,
}
interface ReleaseDate {
	certification: string;
	descriptors: string[];
	iso_639_1: string;
	note: string;
	release_date: string;
	type: ReleaseDateType;
}

interface CountryReleaseDates {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}

type ReleaseDatesResponse = CountryReleaseDates[];

type ReleaseDateResponse = { results: ReleaseDatesResponse };
