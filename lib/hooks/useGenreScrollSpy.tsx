"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type IndicatorStyle = {
	transform: string;
	width: string;
};

export function useGenreScrollSpy(ids: number[]) {
	const [activeId, setActiveId] = useState<number>(ids[0]);
	const [indicator, setIndicator] = useState<IndicatorStyle>({
		transform: "translateX(0px)",
		width: "0px",
	});

	const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
	const tabRefs = useRef<Record<number, HTMLButtonElement | null>>({});
	const tabsScrollerRef = useRef<HTMLDivElement | null>(null);
	const isClickScrolling = useRef(false);

	const registerSection = useCallback(
		(id: number) => (el: HTMLDivElement | null) => {
			sectionRefs.current[id] = el;
		},
		[],
	);

	const registerTab = useCallback(
		(id: number) => (el: HTMLButtonElement | null) => {
			tabRefs.current[id] = el;
		},
		[],
	);

	const updateIndicatorPosition = useCallback(() => {
		const tabEl = tabRefs.current[activeId];
		if (!tabEl) return;

		setIndicator({
			transform: `translateX(${tabEl.offsetLeft}px)`,
			width: `${tabEl.offsetWidth}px`,
		});
	}, [activeId]);

	const scrollActiveTabIntoView = useCallback(() => {
		tabRefs.current[activeId]?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	}, [activeId]);

	const pickClosestSection = (entries: IntersectionObserverEntry[]) => {
		const visible = entries.filter((entry) => entry.isIntersecting);
		if (visible.length === 0) return null;

		return visible.reduce((closest, entry) =>
			entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
		);
	};

	const handleObserverEntries = useCallback((entries: IntersectionObserverEntry[]) => {
		if (isClickScrolling.current) return;

		const target = pickClosestSection(entries);
		if (!target) return;

		setActiveId(Number(target.target.getAttribute("data-genre-id")));
	}, []);

	const handleTabClick = useCallback((id: number) => {
		setActiveId(id);

		const section = sectionRefs.current[id];
		if (!section) return;

		isClickScrolling.current = true;
		section.scrollIntoView({ behavior: "smooth", block: "start" });
	}, []);

	useEffect(() => {
		const sections = ids
			.map((id) => sectionRefs.current[id])
			.filter(Boolean) as HTMLDivElement[];

		const observer = new IntersectionObserver(handleObserverEntries, {
			rootMargin: "-160px 0px -55% 0px",
			threshold: 0,
		});

		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	}, [ids, handleObserverEntries]);

	useEffect(() => {
		const releaseGuard = () => {
			isClickScrolling.current = false;
		};
		window.addEventListener("scrollend", releaseGuard);
		return () => window.removeEventListener("scrollend", releaseGuard);
	}, []);

	useLayoutEffect(() => {
		updateIndicatorPosition();
	}, [updateIndicatorPosition]);

	useEffect(() => {
		scrollActiveTabIntoView();
	}, [scrollActiveTabIntoView]);

	useEffect(() => {
		window.addEventListener("resize", updateIndicatorPosition);
		return () => window.removeEventListener("resize", updateIndicatorPosition);
	}, [updateIndicatorPosition]);

	return {
		activeId,
		indicator,
		tabsScrollerRef,
		registerSection,
		registerTab,
		handleTabClick,
	};
}
