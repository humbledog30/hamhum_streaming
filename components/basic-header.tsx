import { NextPage } from "next";

interface Props {}

const BasicHeader = ({
	sticker,
	title,
	description,
	footer,
}: {
	sticker?: string;
	title: string;
	description?: string;
	footer?: string;
}) => {
	return (
		<div className="text-center">
			<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-130 h-80 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)]" />
			{sticker ? (
				<p className="relative z-10 uppercase font-bold text-primary mb-6 tracking-wider w-fit mx-auto bg-border/60 border border-primary/20 py-1.5 px-3 text-xs rounded-2xl">
					{sticker}
				</p>
			) : null}
			<h1 className="relative z-10 font-fraunces text-4xl md:text-5xl font-medium mb-3">
				{title}
			</h1>
			{description ? (
				<p className="relative z-10 text-muted-foreground mx-auto w-full max-w-130 text-pretty mb-3">
					{description}
				</p>
			) : null}
			{footer ? <p className="text-muted-foreground/60 text-xs">{footer}</p> : null}
		</div>
	);
};

export default BasicHeader;
