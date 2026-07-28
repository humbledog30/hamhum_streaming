"use client";
import { useEffect } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

export function GlobalSpotlight() {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	useEffect(() => {
		function handleMouseMove(e: MouseEvent) {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		}
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	const background = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, hsl(var(--foreground)/0.30), transparent 60%)`;
	return <motion.div className="pointer-events-none fixed inset-0 z-10" style={{ background }} />;
}
