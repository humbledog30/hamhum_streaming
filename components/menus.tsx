"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menus = ({}) => {
	const pathname = usePathname();

	return (
		<div className="gap-6 mr-auto ml-5 hidden lg:flex [&>a]:hover:text-primary [&>a]:transition-all [&>a]:duration-200">
			<Link
				data-active={pathname.startsWith("/browse")}
				href={"/browse"}
				className="data-[active=true]:text-primary"
			>
				Browse
			</Link>
			<Link
				data-active={pathname.startsWith("/popular-movies")}
				href={"/popular-movies"}
				className="data-[active=true]:text-primary"
			>
				Popular Movies
			</Link>
			<Link
				data-active={pathname.startsWith("/upcoming-releases")}
				href={"/upcoming-releases"}
				className="data-[active=true]:text-primary"
			>
				Upcoming Releases
			</Link>
			<Link
				data-active={pathname.startsWith("/all-time-great")}
				href={"/all-time-great"}
				className="data-[active=true]:text-primary"
			>
				All Time Great
			</Link>
		</div>
	);
};

export default Menus;
