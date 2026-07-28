import { CreditRow } from "@/types/cast";

interface TmdbCastMember {
	id: number;
	name: string;
	character: string;
	profile_path: string | null;
}

interface TmdbCrewMember {
	id: number;
	name: string;
	job: string;
	profile_path: string | null;
}

interface TmdbCredits {
	cast: TmdbCastMember[];
	crew: TmdbCrewMember[];
}

export interface PersonRow {
	tmdb_person_id: number;
	name: string;
	profile_path: string | null;
}

const WRITER_JOBS = ["Writer", "Story"];

export const mapCredits = (credits: TmdbCredits, movieId: string) => {
	const peopleMap = new Map<number, PersonRow>();

	const castRows: CreditRow[] = credits.cast.map((c) => {
		peopleMap.set(c.id, {
			tmdb_person_id: c.id,
			name: c.name,
			profile_path: c.profile_path,
		});
		return {
			movie_id: movieId,
			tmdb_person_id: c.id,
			role: "cast",
			job: c.character,
		};
	});

	const crewRows: CreditRow[] = [];
	const seenCrewRoles = new Set<string>();

	credits.crew
		.filter((c) => c.job === "Director" || WRITER_JOBS.includes(c.job))
		.forEach((c) => {
			const role = c.job === "Director" ? "director" : "writer";
			const key = `${c.id}-${role}`;
			if (seenCrewRoles.has(key)) return;
			seenCrewRoles.add(key);

			peopleMap.set(c.id, {
				tmdb_person_id: c.id,
				name: c.name,
				profile_path: c.profile_path,
			});
			crewRows.push({
				movie_id: movieId,
				tmdb_person_id: c.id,
				role,
				job: c.job,
			});
		});

	return {
		people: Array.from(peopleMap.values()),
		credits: [...castRows, ...crewRows],
	};
};
