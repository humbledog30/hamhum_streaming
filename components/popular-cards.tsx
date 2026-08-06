import { formatImagePath } from "@/lib/utils/format-image-path";
import { Movie, MovieDetailsRow } from "@/types/movie";
import { Dot, Flame, PlayCircle } from "lucide-react";
import { NextPage } from "next";
import { FaStar } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";

interface Props {}

const PopularCards = ({ item }: { item: MovieDetailsRow; index: number }) => {
	return (
		<Link href={`/browse/movie/${item.id}`}>
			<div className="relative group rounded-md overflow-hidden hover:cursor-pointer aspect-2/3">
				{item?.popularity ? (
					<Badge
						variant={"outline"}
						className="transition-all absolute top-3 z-20 right-3 flex items-center font-semibold gap-2 py-1 border-accent bg-accent/70 rounded-2xl"
					>
						<Flame className="size-3 text-orange-400" />
						<p>{item.popularity?.toFixed(0)}</p>
					</Badge>
				) : null}

				<Image
					className="object-cover img-brightness-saturate group-hover:brightness-90 group-hover:scale-105 transition-all"
					src={`${formatImagePath(item.poster_path, "w500")}`}
					alt={item.title ?? "Movie poster"}
					fill
					sizes="(max-width: 640px) 100vw, 224px"
				/>

				<div className="text-foreground flex flex-col gap-1 absolute top-0 left-0 w-full h-full z-30 justify-end p-5 bg-[linear-gradient(0deg,hsl(var(--background)/1)_0%,hsl(var(--background)/0.05)_60%)]">
					<p className="font-fraunces text-lg font-semibold leading-[1.2]">
						{item.title}
					</p>
					<div className="text-[10px] flex items-center opacity-80">
						{item?.release_date ? (
							<span>{item?.release_date.split("-")[0]}</span>
						) : null}
						<Dot className="size-3" />
						{item?.certification ? <span>{item?.certification}</span> : null}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default PopularCards;
