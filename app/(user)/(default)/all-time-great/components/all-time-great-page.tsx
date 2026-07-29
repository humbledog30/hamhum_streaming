"use client";
import PageSectionHeader from "@/components/page-section-header";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import AllTimeContent from "./all-time-content";
import { AllTimeSkeleton } from "./all-time-skeleton";

const AllTimeGreatPage = ({}) => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["all-time-great"],
		queryFn: async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.rpc("get_top_movies", {
				min_votes: 5000,
				result_limit: 15,
			});

			if (error) throw error;

			return data;
		},
	});
	if (isLoading) {
		return <AllTimeSkeleton />;
	}
	return (
		<div>
			<PageSectionHeader
				tagline="TIMELESS MASTERPIECES"
				title={
					<>
						All <span className="italic text-muted-foreground">Time</span> Great
					</>
				}
				description="Step into a world of cinematic excellence featuring the most celebrated movies, iconic characters, and stories that remain unforgettable."
			/>
			<AllTimeContent data={data} />
		</div>
	);
};

export default AllTimeGreatPage;
