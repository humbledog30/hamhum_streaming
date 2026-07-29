import type { Metadata } from "next";
import UpcomingReleasesPage from "./components/upcoming-releases-page";
import { defaultUrl } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Ham+Hum | Upcoming Releases",
	metadataBase: new URL(`${defaultUrl}/upcoming-releases`),
	description:
		"Discover upcoming movies arriving on Hamhum. Browse release dates, trailers, and everything coming soon.",
};

export default function Page() {
	return <UpcomingReleasesPage />;
}
