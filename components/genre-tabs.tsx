"use client";

import { genreList } from "@/lib/hooks/useGenresLabel";
import { useGenreScrollSpy } from "@/lib/hooks/useGenreScrollSpy";
import { useDragScroll } from "@/lib/hooks/useDragScroll";

type GenreTabsProps = {
	scrollSpy: ReturnType<typeof useGenreScrollSpy>;
};

export const GenreTabs = ({ scrollSpy }: GenreTabsProps) => {
	const { activeId, indicator, tabsScrollerRef, registerTab, handleTabClick } = scrollSpy;

	useDragScroll(tabsScrollerRef);

	return (
		<div className="sticky top-16 z-40 border-b bg-background/90 backdrop-blur">
			<div
				ref={tabsScrollerRef}
				className="section-container relative flex gap-3 overflow-x-auto scrollbar-none cursor-grab select-none [&.dragging]:cursor-grabbing"
			>
				{genreList.map((item) => (
					<button
						key={item.id}
						type="button"
						ref={registerTab(item.id)}
						data-highlight={activeId === item.id ? "active" : "inactive"}
						onClick={() => handleTabClick(item.id)}
						className="transition-all duration-300 flex shrink-0 items-center gap-2 px-5 py-3 text-nowrap text-muted-foreground data-[highlight=active]:text-foreground cursor-pointer"
					>
						{item.name}

						<span
							data-highlight={activeId === item.id ? "active" : "inactive"}
							className="transition-all duration-300 rounded-2xl border data-[highlight=active]:bg-primary/20 data-[highlight=active]:border-primary data-[highlight=active]:text-primary border-muted-foreground/60 bg-primary/0 px-3 py-0.5 text-xs font-semibold text-muted-foreground/60"
						>
							100
						</span>
					</button>
				))}

				<span
					className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left transition-transform duration-300 ease-out will-change-transform"
					style={{ transform: indicator.transform, width: indicator.width }}
				/>
			</div>
		</div>
	);
};
