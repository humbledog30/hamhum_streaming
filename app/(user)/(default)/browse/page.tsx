import type { Metadata } from "next";

import { defaultUrl } from "@/lib/utils";
import BrowseContent from "./components/browse-content";

export const metadata: Metadata = {
	title: "Ham+Hum | Browse Movies",
	metadataBase: new URL(`${defaultUrl}/popular-movies`),
	description:
		"Every great story starts here. Journey through epic adventures, thrilling mysteries, heartfelt romances, and unforgettable cinematic experiences.",
};

export default function Page() {
	return <BrowseContent />;
}
