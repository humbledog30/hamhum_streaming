"use client";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AskGeminiButton = () => {
	const router = useRouter();
	return (
		<Button
			variant={"outline"}
			size={"sm"}
			className="rounded-full text-xs xl:rounded-2xl px-2 xl:px-3 relative"
			onClick={() => router.push("/movie-recommendation")}
		>
			<motion.div
				animate={{
					rotate: [0, 8, 0, -8, 0],
					scale: [0.9, 1.05, 1.12, 1.05, 0.9],
					opacity: [0.8, 1, 1, 1, 0.8],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<svg viewBox="0 0 24 24" className="size-4 scale-120">
					<defs>
						<linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#3B82F6" />
							<stop offset="100%" stopColor="#A855F7" />
						</linearGradient>
					</defs>
					<path
						d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z"
						fill="url(#sparkleGradient)"
					/>
				</svg>
			</motion.div>
			<p className="hidden xl:block bg-linear-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
				Ask AI Movie Agent
			</p>
		</Button>
	);
};

export default AskGeminiButton;
