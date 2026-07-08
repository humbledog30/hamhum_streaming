import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

export function ExpandableWrapper({ children }: { children: React.ReactNode }) {
	const [expanded, setExpanded] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight);
		}
	}, [children, expanded]);

	return (
		<div className="flex flex-col gap-4 ">
			<div
				className="overflow-hidden transition-[max-height]  duration-500 ease-in-out relative"
				style={{ maxHeight: expanded ? height : 300 }}
			>
				<div ref={contentRef}>{children}</div>
				{!expanded && (
					<div
						className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-background to-transparent backdrop-blur-sm pointer-events-none"
						style={{
							maskImage: "linear-gradient(to top, black, transparent)",
							WebkitMaskImage: "linear-gradient(to top, black, transparent)",
						}}
					/>
				)}
			</div>

			<Button
				onClick={() => setExpanded((p) => !p)}
				className="mt-2 mx-auto text-sm font-medium rounded-2xl cursor-pointer"
				size={"lg"}
				variant={"outline"}
			>
				{expanded ? "View less" : "View more"}
			</Button>
		</div>
	);
}
