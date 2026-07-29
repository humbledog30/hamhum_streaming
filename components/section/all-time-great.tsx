"use client";
import { useAllTimeGreatMovie } from "@/lib/queries/useMovieQuery";
import { MoveRight, Trophy } from "lucide-react";
import AllTimeCard from "../all-time-card";
import Link from "next/link";
import { Separator } from "../ui/separator";

const AllTimeGreat = ({}) => {
	const { data, isLoading, error } = useAllTimeGreatMovie();
	if (error) {
		return null;
	}
	return (
		<section className="py-5 section-container">
			<div className="flex gap-5 flex-col">
				<div className="flex justify-between items-center gap-5 flex-wrap">
					<h6 className="section-title flex gap-3 items-center ">All Time Great</h6>
					<Separator className="flex-1" />
					<Link
						href="/all-time-great"
						className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
					>
						See all
						<MoveRight size={16} />
					</Link>
				</div>
				<AllTimeCard data={data} isLoading={isLoading} />
			</div>
		</section>
	);
};

export default AllTimeGreat;
