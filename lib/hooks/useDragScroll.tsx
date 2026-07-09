"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useDragScroll(scrollerRef: RefObject<HTMLDivElement | null>) {
	const isPointerDown = useRef(false);
	const didDrag = useRef(false);
	const startX = useRef(0);
	const startScrollLeft = useRef(0);
	const activePointerId = useRef<number | null>(null);

	useEffect(() => {
		const el = scrollerRef.current;
		if (!el) return;

		const DRAG_THRESHOLD_PX = 5;

		const handlePointerDown = (e: PointerEvent) => {
			if (e.button !== 0) return;

			// Don't capture yet — just note where the gesture started.
			// A plain tap should still hit the button underneath normally.
			isPointerDown.current = true;
			didDrag.current = false;
			startX.current = e.clientX;
			startScrollLeft.current = el.scrollLeft;
			activePointerId.current = e.pointerId;
		};

		const handlePointerMove = (e: PointerEvent) => {
			if (!isPointerDown.current) return;

			const deltaX = e.clientX - startX.current;

			if (!didDrag.current && Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
				didDrag.current = true;
				el.classList.add("dragging");

				// Only now do we capture the pointer — the gesture has proven
				// itself to be a drag, not a click, so it's safe to hijack
				// subsequent events without breaking a tap's click.
				if (activePointerId.current !== null) {
					el.setPointerCapture(activePointerId.current);
				}
			}

			if (didDrag.current) {
				el.scrollLeft = startScrollLeft.current - deltaX;
			}
		};

		const endDrag = (e: PointerEvent) => {
			isPointerDown.current = false;
			el.classList.remove("dragging");

			if (el.hasPointerCapture(e.pointerId)) {
				el.releasePointerCapture(e.pointerId);
			}
		};

		// Suppress the click that follows a drag, so releasing past a tab
		// doesn't also "select" it. Only fires when a real drag happened.
		const handleClickCapture = (e: MouseEvent) => {
			if (didDrag.current) {
				e.stopPropagation();
				e.preventDefault();
				didDrag.current = false;
			}
		};

		el.addEventListener("pointerdown", handlePointerDown);
		el.addEventListener("pointermove", handlePointerMove);
		el.addEventListener("pointerup", endDrag);
		el.addEventListener("pointercancel", endDrag);
		el.addEventListener("click", handleClickCapture, { capture: true });

		return () => {
			el.removeEventListener("pointerdown", handlePointerDown);
			el.removeEventListener("pointermove", handlePointerMove);
			el.removeEventListener("pointerup", endDrag);
			el.removeEventListener("pointercancel", endDrag);
			el.removeEventListener("click", handleClickCapture, { capture: true });
		};
	}, [scrollerRef]);
}
