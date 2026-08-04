"use client";

import { useLayoutEffect, useRef, useCallback, RefObject } from "react";

interface UseTextFitOptions {
	min?: number;
	max?: number;
	step?: number;
	mode?: "single" | "multi";
}

/**
 * Hook version — attach a ref to your own container element and this
 * will keep its font-size fit to the container as content/size changes.
 *
 * Usage:
 *   const ref = useTextFit<HTMLDivElement>({ mode: "single" });
 *   <div ref={ref} style={{ width: 300 }}>Some headline text</div>
 */
export function useTextFit<T extends HTMLElement>(
	options: UseTextFitOptions = {},
): RefObject<T | null> {
	const { min = 8, max = 200, step = 1, mode = "multi" } = options;
	const ref = useRef<T>(null);

	const calculate = useCallback(() => {
		const el = ref.current;
		if (!el || el.clientWidth === 0 || el.clientHeight === 0) return;

		const originalWhiteSpace = el.style.whiteSpace;
		if (mode === "single") el.style.whiteSpace = "nowrap";

		let lo = min;
		let hi = max;
		let best = min;

		const fits = (size: number) => {
			el.style.fontSize = `${size}px`;
			const widthFits = el.scrollWidth <= el.clientWidth;
			const heightFits = mode === "single" ? true : el.scrollHeight <= el.clientHeight;
			return widthFits && heightFits;
		};

		while (lo <= hi) {
			const mid = Math.floor((lo + hi) / 2);
			if (fits(mid)) {
				best = mid;
				lo = mid + step;
			} else {
				hi = mid - step;
			}
		}

		el.style.fontSize = `${best}px`;
		if (mode === "single") el.style.whiteSpace = originalWhiteSpace;
	}, [min, max, step, mode]);

	useLayoutEffect(() => {
		calculate();
		const el = ref.current;
		if (!el || typeof ResizeObserver === "undefined") return;

		const ro = new ResizeObserver(calculate);
		ro.observe(el);
		return () => ro.disconnect();
	}, [calculate]);

	return ref;
}
