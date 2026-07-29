import type { Metadata } from "next";

import { defaultUrl } from "@/lib/utils";
import AllTimeGreatPage from "./components/all-time-great-page";

export const metadata: Metadata = {
	title: "Ham+Hum | All Time Great",
	metadataBase: new URL(`${defaultUrl}/popular-movies`),
	description:
		"Discover the greatest movies of all time, from timeless classics to legendary masterpieces. Explore iconic films, unforgettable performances, and stories that shaped cinema history.",
};

export default function Page() {
	return <AllTimeGreatPage />;
}
