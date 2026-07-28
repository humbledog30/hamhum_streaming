"use client";

import { useGenreScrollSpy } from "@/lib/hooks/useGenreScrollSpy";
import { useDragScroll } from "@/lib/hooks/useDragScroll";
import { genreList } from "@/lib/utils/format-genre";

type GenreTabsProps = {
	scrollSpy: ReturnType<typeof useGenreScrollSpy>;
	genreIds: number[];
};

export const GenreTabs = ({ scrollSpy, genreIds }: GenreTabsProps) => {
	const { activeId, indicator, tabsScrollerRef, registerTab, handleTabClick } = scrollSpy;
	const genreData = genreIds.map((item) => {
		const genre = genreList.find((u) => u.id === item);
		return {
			id: item,
			name: genre?.name,
		};
	});
	useDragScroll(tabsScrollerRef);
	return (
		<div className="sticky top-16 z-40 border-b bg-background/90 backdrop-blur">
			<div
				ref={tabsScrollerRef}
				className="section-container mask-[linear-gradient(to_right,transparent,hsl(var(--background))_5%,hsl(var(--background))_95%,transparent)] relative flex gap-3 overflow-x-auto scrollbar-none cursor-grab select-none [&.dragging]:cursor-grabbing"
			>
				{genreData.map((item) => (
					<button
						key={item.id}
						type="button"
						ref={registerTab(item.id)}
						data-highlight={activeId === item.id ? "active" : "inactive"}
						onClick={() => handleTabClick(item.id)}
						className="transition-all duration-200 flex shrink-0 items-center gap-2 px-5 py-3 text-nowrap text-muted-foreground data-[highlight=active]:text-foreground cursor-pointer"
					>
						{item.name}

						{/* <span
							data-highlight={activeId === item.id ? "active" : "inactive"}
							className="transition-all duration-200 border data-[highlight=active]:bg-primary/20 data-[highlight=active]:border-primary data-[highlight=active]:text-primary border-muted-foreground/60 bg-primary/0 px-3 py-0.5 text-xs font-semibold text-muted-foreground/60"
						>
							100
						</span> */}
					</button>
				))}

				<span
					className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left transition-transform duration-200 ease-out will-change-transform"
					style={{ transform: indicator.transform, width: indicator.width }}
				/>
			</div>
		</div>
	);
};
