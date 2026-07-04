import { FaStar } from "react-icons/fa";
import { NextPage } from "next";
import { Dot, Play, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { FaPlay } from "react-icons/fa6";

interface Props {}

const HeroSection: NextPage<Props> = ({}) => {
	return (
		<div className="w-full h-[calc(100dvh-64px)] min-h-150 relative overflow-hidden">
			<img
				className="w-full h-full object-cover absolute z-0"
				src="https://image.tmdb.org/t/p/original/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg"
				alt="Toy Story 5"
			/>

			<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.18),transparent_55%)]" />

			<div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,hsl(var(--background)/0.05)_0%,hsl(var(--background)/0.55)_58%,hsl(var(--background)/1)_100%)]" />

			<div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,hsl(var(--background)/0.75)_0%,hsl(var(--background)/0.15)_45%,hsl(var(--background)/0.05)_70%)]" />

			<div className="container px-5 h-full z-20 mx-auto relative flex flex-col justify-end pb-10">
				<div className="py-5 border-b border-muted-foreground">
					<p className="mb-4 font-jetbrains-mono text-xs flex gap-1 items-center text-primary">
						<div className="relative ">
							<Dot className="scale-[2] animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
							<Dot className="scale-[2]" />
						</div>{" "}
						NOW STREAMING
					</p>
					<div className="meta-information flex gap-3 mb-4 items-center text-muted-foreground">
						<div className="flex gap-3 border-r border-muted-foreground pr-3">
							<span className="border p-1 px-2.5 rounded-md text-xs border-foreground">
								PG
							</span>
							<span>2026</span>
							<span>2h 11m</span>
							<span className="flex items-center gap-1 text-sm text-primary">
								<FaStar /> 8.4
							</span>
						</div>
						<div className="flex gap-3">
							<span>Animation</span>
							<span>Familie</span>
							<span>Komödie</span>
							<span>Abenteuer</span>
						</div>
					</div>
					<p className="text-8xl font-fraunces text-foreground">Toy Story 5</p>
				</div>
				<div className="flex justify-between items-end gap-3 py-5">
					<p className="italic text-muted-foreground max-w-[75%]">
						"When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz,
						Woody, Jessie and the rest of the gang's jobs become exponentially harder
						when they have to go head to head with the all-new threat to playtime."
					</p>
					<div className="action-buttons flex gap-3 flex-wrap">
						<Button size="lg" className="rounded-3xl py-6">
							<FaPlay /> Watch now
						</Button>
						<Button
							size="lg"
							className="bg-transparent border-foreground rounded-3xl py-6"
							variant={"outline"}
						>
							<Plus /> Add to list
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
