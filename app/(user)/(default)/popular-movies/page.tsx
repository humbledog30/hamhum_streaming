import type { Metadata } from "next";

import { defaultUrl } from "@/lib/utils";
import PopularMoviesPage from "./components/popular-movies-page";

export const metadata: Metadata = {
	title: "Ham+Hum | Popular Movies",
	metadataBase: new URL(`${defaultUrl}/popular-movies`),
	description:
		"Discover the movies everyone's watching right now. From blockbuster hits to fan favorites, explore the most popular films trending across audiences.",
};

export default function Page() {
	return <PopularMoviesPage />;
}
