import { Dot } from "lucide-react";
import { NextPage } from "next";

interface Props {}

const StreamingIndicator = ({ label = "NOW STREAMING" }: { label?: string }) => {
	return (
		<div className="mb-4 font-jetbrains-mono text-xs flex gap-1 items-center text-red-500">
			<div className="relative">
				<Dot className="scale-[2] animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				<Dot className="scale-[2]" />
			</div>
			<span>{label}</span>
		</div>
	);
};

export default StreamingIndicator;
