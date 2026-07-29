import { CastMember, CrewMember } from "@/types/cast";
import { Genre } from "@/types/movie";
import { Dot } from "lucide-react";
import React from "react";

interface CastRowDetails {
	job: string | null;
	name: string | null;
	profile_path: string | null;
	role: string;
	id: number;
}

const Details = ({ data, label }: { data: (CastRowDetails | Genre)[]; label: string }) => {
	return (
		<div className="flex flex-wrap pb-4 border-b">
			<span className="w-25 md:w-37.5 font-extralight text-sm text-foreground/40 uppercase ">
				{label}
			</span>
			<div className="flex-1 flex flex-wrap items-center gap-1">
				{data.map((dataItem, index) => {
					return (
						<React.Fragment key={`cast-${dataItem.id}`}>
							<span>{dataItem.name}</span>
							{index + 1 < data.length ? <Dot size={11} /> : null}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Details;
