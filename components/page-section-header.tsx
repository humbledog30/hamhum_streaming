import { Slash } from "lucide-react";
import { NextPage } from "next";

interface Props {}

const PageSectionHeader = ({
	tagline,
	title,
	description,
}: {
	tagline?: string | null;
	title: React.ReactNode;
	description?: string | null;
}) => {
	return (
		<section className="relative w-full">
			{/* <div className="absolute inset-0 bg-background">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_15%_0%,hsl(var(--primary)/0.30),transparent_60%)]" />
					<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
				</div> */}
			<div className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10">
				<span className="flex items-center gap-3 font-semibold tracking-widest uppercase text-muted-foreground">
					<Slash className="rotate-45 text-primary" />
					{tagline}
				</span>

				<h1 className="max-w-200 text-6xl leading-16 font-fraunces font-semibold text-pretty">
					{title}
				</h1>
				{description ? (
					<p className="mt-4 max-w-150 text-lg text-muted-foreground">{description}</p>
				) : null}
			</div>
		</section>
	);
};

export default PageSectionHeader;
