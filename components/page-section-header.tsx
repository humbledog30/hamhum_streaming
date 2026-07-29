"use client";

import { motion, type Variants } from "framer-motion";
import { Slash } from "lucide-react";

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
	},
};

interface HeroProps {
	tagline?: string | null;
	title: React.ReactNode;
	description?: string | null;
}

const PageSectionHeader = ({ tagline, title, description }: HeroProps) => {
	return (
		<section className="relative w-full">
			<motion.div
				className="section-container relative z-10 flex flex-col gap-y-4 pt-30 pb-10"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.span
					variants={itemVariants}
					className="flex items-center gap-3 font-semibold tracking-widest uppercase text-muted-foreground"
				>
					<Slash className="rotate-45 text-primary" />
					{tagline}
				</motion.span>

				<motion.h1
					variants={itemVariants}
					className="max-w-200 text-6xl leading-16 font-fraunces font-semibold text-pretty"
				>
					{title}
				</motion.h1>

				{description ? (
					<motion.p
						variants={itemVariants}
						className="mt-4 max-w-150 text-lg text-muted-foreground"
					>
						{description}
					</motion.p>
				) : null}
			</motion.div>
		</section>
	);
};

export default PageSectionHeader;
